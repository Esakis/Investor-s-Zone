import { useEffect, useState } from "react";
import { Icon, Button, Form } from 'semantic-ui-react';

type ForumPost = {
    id?: number;
    title: string;
    post: string;
};

type Notification = { type: 'success' | 'error'; message: string } | null;

const ForumMain = (props: { email?: string }) => {
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [offline, setOffline] = useState(false);

    const [newTitle, setNewTitle] = useState('');
    const [newPost, setNewPost] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [notification, setNotification] = useState<Notification>(null);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const r = await fetch('https://localhost:44349/api/forum/forum', {
                credentials: 'include',
            });
            const data = await r.json();
            setPosts(Array.isArray(data) ? data : []);
            setOffline(false);
        } catch (_e) {
            setOffline(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, []);

    const showNotif = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newPost.trim()) return;
        setSubmitting(true);
        try {
            const r = await fetch('https://localhost:44349/api/forum/forum', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle.trim(), post: newPost.trim() }),
            });
            if (r.ok) {
                showNotif('success', 'Post dodany pomyślnie.');
                setNewTitle('');
                setNewPost('');
                fetchPosts();
            } else {
                const err = await r.json().catch(() => ({}));
                showNotif('error', `Błąd: ${err.message ?? err.title ?? 'Nie udało się dodać posta.'}`);
            }
        } catch (_e) {
            showNotif('error', 'Brak połączenia z serwerem.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="forum-page">
            <div className="chart-card" style={{ marginBottom: '28px' }}>
                <h2 className="chart-card__title">
                    <Icon name="comments" /> Forum
                </h2>
                <p className="chart-card__sub">Dyskusje społeczności Investor's Zone</p>
            </div>

            {/* Notification */}
            {notification && (
                <div className={`ui message ${notification.type === 'success' ? 'positive' : 'negative'}`}
                    style={{ marginBottom: '16px' }}>
                    <div className="header">
                        {notification.type === 'success' ? 'Gotowe' : 'Błąd'}
                    </div>
                    <p>{notification.message}</p>
                </div>
            )}

            {/* Compose form */}
            {props.email && (
                <div className="forum-compose">
                    <p className="forum-compose__title">
                        <Icon name="edit" /> Napisz post
                    </p>
                    <Form onSubmit={handleSubmit} unstackable>
                        <Form.Group widths={1}>
                            <Form.Input
                                label="Tytuł"
                                placeholder="Temat wiadomości"
                                value={newTitle}
                                required
                                onChange={e => setNewTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group widths={1}>
                            <Form.TextArea
                                label="Treść"
                                placeholder="Napisz coś..."
                                rows={4}
                                value={newPost}
                                required
                                onChange={(_e, d) => setNewPost(d.value as string)}
                            />
                        </Form.Group>
                        <Button type="submit" inverted color="teal" loading={submitting}
                            icon labelPosition="left" disabled={submitting}>
                            <Icon name="send" />
                            Opublikuj
                        </Button>
                    </Form>
                </div>
            )}

            {/* Posts list */}
            {isLoading && (
                <div className="loading-box">
                    <Icon name="circle notch" loading /> Ładowanie postów…
                </div>
            )}

            {!isLoading && offline && (
                <div className="forum-empty">
                    <Icon name="warning sign" size="large" />
                    <p style={{ marginTop: '12px' }}>Nie można połączyć z serwerem. Sprawdź, czy backend jest uruchomiony.</p>
                </div>
            )}

            {!isLoading && !offline && posts.length === 0 && (
                <div className="forum-empty">
                    <Icon name="inbox" size="large" />
                    <p style={{ marginTop: '12px' }}>Brak postów. Bądź pierwszy!</p>
                </div>
            )}

            {!isLoading && !offline && posts.map((p, i) => (
                <div key={p.id ?? i} className="forum-card">
                    <p className="forum-card__title">{p.title}</p>
                    <p className="forum-card__body">{p.post}</p>
                </div>
            ))}
        </div>
    );
};

export default ForumMain;
