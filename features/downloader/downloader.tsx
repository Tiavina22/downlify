"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useDownloader } from "./use-downloader";
import { CardDownloader } from "./components/card-downloader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MediaType } from "../data-type";
import { PreventLeavingPage } from "@/components/prevent-leaving-page";

export function Downloader() {
  const {
    url,
    setUrl,
    downloads,
    startDownload,
    mediaType,
    setMediaType,
    removeOrAbortDownload,
    onDownload,
    copyUrl,
  } = useDownloader();

  return (
    <PreventLeavingPage isDirty={downloads.length > 0}>
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gradient-to-b from-background/80 to-background rounded-xl shadow-lg border border-border/50">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">YouTube Downloader</h1>
          <p className="text-muted-foreground">Téléchargez vos vidéos YouTube en MP3 ou MP4</p>
        </div>

        <RadioGroup
          defaultValue={mediaType}
          onValueChange={(value) => setMediaType(value as MediaType)}
          className="flex justify-center space-x-6"
        >
          <div className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <RadioGroupItem value="mp3" id="mp3" className="data-[state=checked]:border-primary data-[state=checked]:bg-primary" />
            <Label htmlFor="mp3" className="font-medium cursor-pointer">MP3</Label>
          </div>
          <div className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <RadioGroupItem value="mp4" id="mp4" className="data-[state=checked]:border-primary data-[state=checked]:bg-primary" />
            <Label htmlFor="mp4" className="font-medium cursor-pointer">MP4</Label>
          </div>
        </RadioGroup>

        <div className="flex space-x-2 backdrop-blur-sm bg-card/50 p-4 rounded-lg">
          <Input
            type="url"
            placeholder="Collez l'URL YouTube ici"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="grow bg-background/50"
          />
          <Button 
            onClick={startDownload}
            className="bg-primary hover:bg-primary/90 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" /> Télécharger
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {downloads.map((download) => (
            <div key={download.id} className="transform transition-all duration-200 hover:scale-[1.02]">
              <CardDownloader
                download={download}
                onRemove={removeOrAbortDownload}
                onDownload={onDownload}
                onClickCard={(download) => copyUrl(download.url)}
              />
            </div>
          ))}
        </div>
      </div>
    </PreventLeavingPage>
  );
}
