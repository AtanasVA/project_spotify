"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UploadModal from "../_components/UploadModal";

const KingsLanding = () => {
  const router = useRouter();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="center text-center">
        <CardBody className="text-center">
          <p>Welcome!</p>
          <p>
            Before we proceed, do you have your Spotify data downloaded already
            ?
          </p>
        </CardBody>
        <div className="pb-2">
          <Button className="mr-2" onPress={() => setIsUploadModalOpen(true)}>
            Yes
          </Button>
          <Button
            onPress={() =>
              window.open("https://www.spotify.com/bg-bg/account/privacy/")
            }
          >
            No
          </Button>
        </div>
      </Card>
      <UploadModal
        isOpen={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </>
  );
};

export default KingsLanding;
