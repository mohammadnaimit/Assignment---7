"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Input, Label, TextField, toast } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [editedName, setEditedName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  
  const name = editedName ?? user?.name ?? "";

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const handleUpdate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      toast.danger("নাম খালি রাখা যাবে না");
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setSaving(false);

    if (error) {
      toast.danger(error.message || "আপডেট ব্যর্থ হয়েছে");
      return;
    }

    toast.success("প্রোফাইল আপডেট হয়েছে!");
    setEditedName(null);
    router.refresh();
  };

  if (isPending || !user) {
    return (
      <div className="bg-[#F4F7F4] px-4 py-12">
        <p className="mx-auto max-w-[520px] text-[14px] text-[#6b776f]">
          লোড হচ্ছে...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7F4] px-4 py-12">
      <div className="mx-auto max-w-[520px]">
        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-[22px] font-bold text-[#1f2a24]">
            আমার প্রোফাইল
          </h1>
          <p className="text-[12px] text-[#6b776f]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

      
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-[#e3e9e5] bg-white/80 p-4">
          <div className="flex items-center gap-3">
            {user.image ? (
              <Image
                alt={user.name}
                src={user.image}
                width={56}
                height={56}
                className="size-14 rounded-xl bg-[#f1f1f1] object-cover"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-xl bg-[#e3e9e5] text-[20px] font-bold text-[#0b8a43]">
                {user.name?.charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-[16px] font-semibold text-[#2b2b2b]">
                {user.name}
              </h2>
              <p className="text-[13px] text-[#6b776f]">{user.email}</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onPress={handleSignOut}
            className="border-red-400 font-semibold text-red-500"
          >
            ↩ সাইন আউট
          </Button>
        </div>

      
        <div className="rounded-2xl border border-[#e3e9e5] bg-white/80 p-5">
          <h3 className="mb-4 text-[15px] font-semibold text-[#1f2a24]">
            তথ্য
          </h3>

          <form onSubmit={handleUpdate} className="space-y-4 px-2">
            <TextField
              className="w-full"
              name="name"
              value={name}
              onChange={setEditedName}
            >
              <Label>নাম</Label>
              <Input placeholder="আপনার নাম লিখুন" />
            </TextField>

            <Button
              type="submit"
              isPending={saving}
              className="w-full bg-[#0b8a43] font-semibold text-white"
            >
              আপডেট
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;