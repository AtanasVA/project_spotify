"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UploadModal from "../_components/UploadModal";
import { Input } from "@nextui-org/react";

const fetchEndpoint = async (songName: string, artistName: string) => {
  const res = await fetch(
    `http://localhost:3000/api/get/history?track_name=${songName}&artist_name=${artistName}`,
  );
  return res.json();
};

const KingsLanding = () => {
  const router = useRouter();
  const [songName, setSongName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  const filterBySongName = (input: string) => {
    setSongName(input);
  };
  const filterByArtistName = (input: string) => {
    setArtistName(input);
  };

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
        <div className="pb-2">
          <Input onChange={({ target }) => filterByArtistName(target.value)}>
            Enter artistName
          </Input>
          <Input onChange={({ target }) => filterBySongName(target.value)}>
            Enter Song
          </Input>
          <Button
            onPress={async () => {
              const response = await fetchEndpoint(songName, artistName);
              console.log("response", response);
            }}
          >
            Hit get endpoint
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
