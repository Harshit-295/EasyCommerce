import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getUserFromToken";
import Cart from "@/model/cartSchema";

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const { productId, name, price, image, size, stock, quantity } = await request.json();


    // ✅ Validation: Make sure required fields exist

    if (!productId || !name || !price || !image) {
      return NextResponse.json(
        { message: "Missing required fields (productId, name, price, image)" },
        { status: 400 }
      );
    }
    console.log("Incoming cart item:", {
  productId,
  name,
  price,
  image,
  size,
  stock,
  quantity,
});
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [
          {
            productId,
            name,
            price,
            image,
            size,
            stock,
            quantity,
          },
        ],
      });
    } else {
      const existingItemIndex = (cart.items as any[]).findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        
        cart.items[existingItemIndex].quantity += quantity;
      } else {
       
        cart.items.push({
          productId,
          name,
          price,
          image,
          size,
          stock,
          quantity,
        });
      }
    }

    const savedCart = await cart.save();

    return NextResponse.json({
      message: "Cart updated successfully",
      success: true,
      cart: savedCart,
    });
  } catch (error: any) {
    console.error("Add to Cart Error:", error.message);
    return NextResponse.json(
      { message: "Failed to update cart", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request:NextRequest){
    const userId= getDataFromToken(request);
    let cart = await Cart.findOne({user:userId}); 

    if(!cart){
        NextResponse.json({message:"Cart Not exist"});
    }
    return NextResponse.json({
        message:"Shown yor cart",
        success:true,
        cart,
    })
}


export async function DELETE(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const url = new URL(request.url);
    const productId = url.searchParams.get("id");

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return NextResponse.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

    cart.items =(cart.items as any[]).filter(
      (item) => item.productId.toString() !== productId
    );

    const updatedCart = await cart.save();

    return NextResponse.json({
      message: "Item removed from cart",
      success: true,
      cart: updatedCart,
    });
  } catch (error: any) {
    console.error("Remove From Cart Error:", error.message);
    return NextResponse.json(
      { message: "Failed to remove item from cart", error: error.message },
      { status: 500 }
    );
  }
}