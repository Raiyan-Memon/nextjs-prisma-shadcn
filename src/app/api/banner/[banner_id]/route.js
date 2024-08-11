import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  const { banner_id } = await params;
  const deleteData = await prisma.banners.delete({
    where: {
      id: banner_id,
    },
  });
  return Response.json(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
}

export async function PATCH(req, { params }) {
  const { banner_id } = await params;
  const { image } = await req.json();

  const updateData = await prisma.banners.update({
    where: {
      id: banner_id,
    },
    data: {
      image: image,
    },
  });
  return Response.json(
    {
      success: true,
    },
    {
      status: 200,
    }
  );
}
