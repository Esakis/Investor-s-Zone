import { Icon } from 'semantic-ui-react';
import CurrencyPanel from "../CurrencyPanel";

const Exchange = (props: { email: string }) => {
    return (
        <div className="chart-page">
            <div className="chart-card">
                <h2 className="chart-card__title" style={{ marginBottom: '20px' }}>
                    <Icon name="exchange" /> Wymiana walut
                </h2>
                <CurrencyPanel email={props.email} />
            </div>
        </div>
    );
};

export default Exchange;
