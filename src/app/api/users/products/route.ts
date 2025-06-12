import Product from "@/model/productSchema";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  await connect();

  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const user = formData.get("user");
    const name = formData.get("name");
    const size = formData.get("size");
    const price = formData.get("price");
    const category = formData.get("category");
    const stock = formData.get("stock");

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "Image file not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "next-cloudinary-uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );
      uploadStream.end(buffer);
    });

    const newProduct = new Product({
      name,
      size,
      price,
      image: result.secure_url,
      category,
      stock,
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json(
      {
        message: "Product created successfully",
        success: true,
        product: savedProduct,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Internal Server Error", detail: error.message }, { status: 500 });
  }
}


export async function GET(request:NextRequest){
    try {
        const products = await Product.find({});
        return NextResponse.json({ success: true, products }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}