import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Movie } from '../../types/movie';
import styles from './MovieModal.module.css';

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    &times;
                </button>
                <img
                    src={
                        movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                            : 'https://via.placeholder.com/1920x1080?text=No+Backdrop'
                    }
                    alt={movie.title}
                    className={styles.image}
                />
                <div className={styles.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview || 'No overview available.'}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date || 'Unknown'}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
                    </p>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    );
}