"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Music, Video } from "lucide-react";
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
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent animate-gradient">
            YouTube Downloader
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Téléchargez facilement vos vidéos YouTube en MP3 ou MP4. 
            Double-cliquez sur une carte pour copier le lien.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 space-y-6 hover:border-primary/50 transition-colors duration-300">
          <RadioGroup
            defaultValue={mediaType}
            onValueChange={(value) => setMediaType(value as MediaType)}
            className="flex justify-center gap-8"
          >
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-accent/50 transition-colors">
              <Music className="h-8 w-8 text-primary" />
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mp3" id="mp3" />
                <Label htmlFor="mp3" className="text-lg">Audio (MP3)</Label>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-accent/50 transition-colors">
              <Video className="h-8 w-8 text-primary" />
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mp4" id="mp4" />
                <Label htmlFor="mp4" className="text-lg">Vidéo (MP4)</Label>
              </div>
            </div>
          </RadioGroup>

          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="Collez l'URL YouTube ici"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-lg py-6"
            />
            <Button 
              onClick={startDownload}
              size="lg"
              className="bg-primary hover:bg-primary/90 transition-colors min-w-[160px]"
            >
              <Download className="mr-2 h-5 w-5" /> Télécharger
            </Button>
          </div>
        </div>

        {downloads.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Téléchargements</h2>
              <p className="text-sm text-muted-foreground">
                {downloads.length} élément(s)
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {downloads.map((download) => (
                <div key={download.id} className="transform transition-all duration-300 hover:scale-[1.02]">
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
        )}
      </div>
    </PreventLeavingPage>
  );
}
