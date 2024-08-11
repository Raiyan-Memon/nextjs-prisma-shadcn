"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeBannerLoading, setStoreBannerLoading] = useState(false);
  const [deleting, setDeleting] = useState(0);
  const [bannerId, setBannerId] = useState(0);
  const [editBanner, setEditBanner] = useState({
    bannerId: bannerId,
    input: "",
  });

  async function getBanners() {
    const myData = await fetch("api/banner");
    const data = await myData.json();
    setBanners(data.data);
    setIsLoading(false);
  }

  async function addBanner(event: FormEvent<HTMLFormElement>) {
    setStoreBannerLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const add = await fetch("api/banner", {
      method: "POST",
      body: formData,
    });

    if (add.ok) {
      getBanners();
      setStoreBannerLoading(false);
      toast.success("Add Banner");
      document.getElementById("SubmitForm").reset();
    }
  }
  async function deleteBanner(id: number) {
    setDeleting(id);
    const deleteBanner = await fetch("api/banner/" + id, {
      method: "DELETE",
    });
    if (deleteBanner.ok) {
      getBanners();
      setDeleting(0);
      toast.success("Banner Deleted");
    }
  }

  function updateEditInput(input: string) {
    setEditBanner({
      bannerId: bannerId,
      input: input,
    });
  }

  function updateBannerId(id: number, value: string) {
    setBannerId(id);
    setEditBanner({
      bannerId: id,
      input: value,
    });
  }

  async function updateBanner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const update = await fetch("api/banner/" + editBanner.bannerId, {
      method: "PATCH",
      body: JSON.stringify({
        image: editBanner.input,
      }),
    });
    if (update.ok) {
      toast.success("Image Updated");
      getBanners();
    } else {
      toast.error("Something Went Wrong");
    }
  }

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className="container my-5">
      <div className="my-5">
        <form id="SubmitForm" onSubmit={addBanner}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input name="image" className="text-black" placeholder="image" />
            </div>

            <div>
              {storeBannerLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </Button>
              ) : (
                <Button type="submit">Save</Button>
              )}
            </div>
          </div>
        </form>
      </div>

      {!isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="p-4 bg-slate-700 text-center">
              <div className="grid grid-cols-2 p-3">
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size={"sm"}
                        onClick={() => updateBannerId(banner.id, banner.image)}
                        variant="secondary"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M15.748 2.947a2 2 0 0 1 2.828 0l2.475 2.475a2 2 0 0 1 0 2.829L9.158 20.144l-6.38 1.076l1.077-6.38L15.748 2.947Zm-.229 3.057l2.475 2.475l1.643-1.643l-2.475-2.474l-1.643 1.642Zm1.06 3.89l-2.474-2.475l-8.384 8.384l-.503 2.977l2.977-.502l8.385-8.385Z"
                            />
                          </svg>
                        </span>
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-black">
                      <form id="updateBanner" onSubmit={updateBanner}>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-slate-700">
                            <div>
                              <Input
                                autoFocus
                                className="text-black"
                                onChange={(e) =>
                                  updateEditInput(e.target.value)
                                }
                                name="edit_banner_image"
                                value={editBanner.input}
                              />
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-2">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction type="submit">
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </form>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div className="text-right">
                  {deleting == banner.id ? (
                    <Button
                      disabled
                      onClick={() => deleteBanner(banner.id)}
                      className="ml-3"
                      size={"sm"}
                      variant={"destructive"}
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                  
                    </Button>
                  ) : (
                    <Button
                      onClick={() => deleteBanner(banner.id)}
                      className="ml-3"
                      size={"sm"}
                      variant={"destructive"}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 304 384"
                        >
                          <path
                            fill="currentColor"
                            d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"
                          />
                        </svg>
                      </span>
                    </Button>
                  )}
                </div>
              </div>
              <h2>{banner.image}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
          <Skeleton className="p-14" />
        </div>
      )}
    </div>
  );
}
