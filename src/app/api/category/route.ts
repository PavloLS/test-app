import {NextResponse} from "next/server";
import {addCategory, editCategory, getCategories} from "@/app/lib/data";

export const GET = async (req: Request, res: Response) => {
  try {
    const categories = getCategories();
    return NextResponse.json({message: 'OK', items: categories});
  } catch (err) {
    return NextResponse.json(
      {message: 'Error', err},
      {status: 500}
    )
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const { name, enabled, sort } = await req.json();
    const category = {id: new Date().getTime(), name, enabled, sort}
    const categories = addCategory(category);
    return NextResponse.json({message: 'OK', items: categories}, {status: 200});
  } catch (err) {
    return NextResponse.json(
      {message: 'Error', err},
      {status: 500}
    )
  }
};

export const PATCH = async (req: Request, res: Response) => {
  try {
    const categories  = await req.json();
    const newCategories = editCategory(categories);
    return NextResponse.json({message: 'OK', items: newCategories}, {status: 200});
  } catch (err) {
    return NextResponse.json(
      {message: 'Error', err},
      {status: 500}
    )
  }
};