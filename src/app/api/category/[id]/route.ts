import {NextResponse} from "next/server";
import {deleteCategory} from "@/app/lib/data";

export const DELETE = async (req: Request, res: Response) => {
  try {
    const id = req.url.split("category/")[1]
    const categories = deleteCategory(Number(id));
    return NextResponse.json({message: 'OK', items: categories}, {status: 200});
  } catch (err) {
    return NextResponse.json(
      {message: 'Error', err},
      {status: 500}
    )
  }
};