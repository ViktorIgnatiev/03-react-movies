import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button className={styles.button} type="submit" disabled={pending}>
            {pending ? 'Searching...' : 'Search'}
        </button>
    );
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleAction = async (formData: FormData) => {
        const query = formData.get('query')?.toString().trim() || '';
        
        if (!query) {
            toast.error('Please enter your search query.');
            return;
        }
        
        onSubmit(query);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form action={handleAction} className={styles.form}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                        required
                    />
                    <SubmitButton />
                </form>
            </div>
        </header>
    );
}