import prisma from "@/lib/prisma";

// Define toJSON for BigInt
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(req) {

  const data = await prisma.banners.findMany();
  return Response.json(
    {
      success: true,
      data: data,
    },
    {
      status: 200,
    }
  );

  const res = await prisma.banners.findMany({
    where: {
      image: {
        contains: "prisma.io",
      },
    },
  });
}

export async function POST(req, res) {
  const formdata = await req.formData();

  const image = formdata.get("image");
  const store = prisma.banners
    .create({
      data: {
        title: "raiyan",
        image: image,
        banner_type: "raiyan",
        media_type: "raiyan",
      },
    })
    .then(function (res) {
      console.log(res.json());
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
