import NoVideoFound from "core/Skeleton/NoVideoFound";
import PlaylistSkeleton from "core/Skeleton/PlaylistSkeleton";
import React, { useEffect, useState } from "react";
import VideoItem from "./components/VideoItem";

const fetchVideos = async (playlistID) => {
  const playlistURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistID}&key=AIzaSyAcrjRfOIkmcEd8dzW3c7PfUlbGGZP2oDw`;

  const response = await fetch(playlistURL);

  const data = await response.json();

  const videos = [];

  for (let item of data.items) {
    const video = {
      id: item.snippet.resourceId.videoId,
      publishOn: item.snippet.publishedAt,
      title: item.snippet.title,
      description: item.snippet.description.substr(0, 200),
      thumbnail: item.snippet.thumbnails.medium.url,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    };

    videos.push(video);
  }

  videos.sort((a, b) => {
    const dateA = new Date(a.publishOn);
    const dateB = new Date(b.publishOn);

    if (dateA < dateB) {
      return 1;
    }

    if (dateA > dateB) {
      return -1;
    }

    return 0;
  });

  return videos;
};

const Training = (props) => {
  const playlistID = props.match.params.playlist;
  const [videos, setVideos] = useState();

  const loadPlaylist = async () => {
    const videos = await fetchVideos(playlistID);
    setVideos(videos);
  };

  useEffect(() => {
    setVideos(null);
    loadPlaylist();
  }, [playlistID]);

  if (!videos) {
    return <PlaylistSkeleton />;
  }

  if (!videos.length) {
    return <NoVideoFound />;
  }

  return (
    <div>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
};

export default Training;
