import { GenreResponseProps } from "../App";
import { Button } from "./Button";

interface SideBarProps {
  genreList: GenreResponseProps[];
  selectedGenreId: number;
  handleSelectGenre: (id: number) => void;
}

export function SideBar({
  genreList,
  handleSelectGenre,
  selectedGenreId,
}: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genreList.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
