import { useCallback, useEffect, useMemo, useState } from "react";

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";
import { Content } from "./components/Content";
import { SideBar } from "./components/SideBar";

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}
export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Genre_id: number;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
    api.get<MovieProps[]>(`movies/`).then((response) => {
      setMovies(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  const handleSelectGenre = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  const moviesByGenre = useMemo(() => {
    const allMovies = movies;
    return allMovies.filter((movie) => {
      return movie.Genre_id === selectedGenreId;
    });
  }, [selectedGenre]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genreList={genres}
        selectedGenreId={selectedGenre.id}
        handleSelectGenre={handleSelectGenre}
      />
      <Content movies={moviesByGenre} genre={selectedGenre.title} />
    </div>
  );
}
