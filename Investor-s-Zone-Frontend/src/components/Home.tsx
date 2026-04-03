import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import CurrencyPanel from './CurrencyPanel';

const Home = ({ email }: { email: string }) => {
    return (
        <div className="landpage-image">
            <div className="hero">
                <h1 className="hero__title">
                    Investor's <span>Zone</span>
                </h1>
                <p className="hero__sub">
                    Aktualne kursy walut NBP. Wymieniaj PLN na waluty obce i śledź historię kursów w czasie rzeczywistym.
                </p>
                <div className="hero__cta">
                    {email ? (
                        <Link to={`/account/exchange/${email}`} className="btn-primary">
                            <Icon name="exchange" /> Wymień walutę
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn-primary">Zaloguj się</Link>
                            <Link to="/register" className="btn-outline">Zarejestruj</Link>
                        </>
                    )}
                </div>
            </div>

            <div className="rates-panel">
                <div className="rates-panel__header">
                    <span className="rates-panel__title">
                        <Icon name="globe" /> Kursy walut NBP — Tabela C
                    </span>
                    <span className="rates-panel__note">Kliknij walutę → wykres historyczny</span>
                </div>
                <div className="card-dark">
                    <CurrencyPanel hideExchangeForm />
                </div>
            </div>
        </div>
    );
};

export default Home;
