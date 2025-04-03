import { Card, CardContent } from "@/components/ui/card";
import { Download as DownloadIcon, Music, Trash2, Video, Link2 } from "lucide-react";
import { CircularProgress } from "./circular-progress";
import { Download } from "../downloader-type";
import { Button } from "@/components/ui/button";

export function CardDownloader({
  download,
  onRemove = () => {},
  onDownload = () => {},
  onClickCard = () => {},
}: CardDownloaderProps) {
  return (
    <Card
      className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/50"
      key={download.id}
      onDoubleClick={() => onClickCard(download)}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {download.mediaType === "mp3" ? (
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Music className="h-4 w-4 text-primary" />
                </div>
              ) : (
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Video className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-medium truncate max-w-[200px]">
                  {download.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {download.status === "downloading" ? "Téléchargement..." : 
                   download.status === "completed" ? "Terminé" : "Erreur"}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {download.status !== "completed" && (
                <CircularProgress value={download.progress} />
              )}
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => onRemove(download)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                {download.status === "completed" && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10 hover:text-primary"
                      onClick={() => onClickCard(download)}
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10 hover:text-primary"
                      onClick={() => onDownload(download)}
                    >
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {download.status === "downloading" && (
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${download.progress}%` }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

type CardDownloaderProps = {
  download: Download;
  onRemove?: (download: Download) => void;
  onDownload?: (download: Download) => void;
  onClickCard?: (download: Download) => void;
};
