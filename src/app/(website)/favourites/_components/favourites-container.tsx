"use client";

import Image from "next/image";
import { useTeamStore } from "@/store/teamStore";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StatementOfWorkForm from "../../services/_components/statement-of-work-form";

export default function FavouritesContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const team = useTeamStore((state) => state.team);
  const removeMember = useTeamStore((state) => state.removeMember);

  return (
    <div className="min-h-screen container mx-auto py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#00383B] text-center">
        My Favourites
      </h1>

      {team.length === 0 ? (
        <div className="w-full h-[500px] flex items-center justify-center">
          <p className="text-gray-600 text-xl font-medium leading-[120%]">
            No favourites added yet.
          </p>
        </div>
      ) : (
        <div className="container mx-auto space-y-4">
          {team.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={member.profileImage || "/default-avatar.png"}
                  alt={member.firstName}
                  width={60}
                  height={60}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Level: {member.level} | {member.rate}/hr
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeMember(member._id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}

          {/* button  */}
          <div className="w-full flex items-center justify-end pt-4">
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              className="bg-[#00383B] hover:bg-[#005356] text-white w-full sm:w-auto"
            >
              Start My SOW
            </Button>
          </div>
        </div>
      )}

      {/* SOW modal form  */}
      {isOpen && (
        <StatementOfWorkForm
          open={isOpen}
          onOpenChange={(open: boolean) => setIsOpen(open)}
        />
      )}
    </div>
  );
}
