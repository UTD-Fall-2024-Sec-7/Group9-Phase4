import { ResponsiveLine } from '@nivo/line';
import { useState, useEffect } from 'react';

function TransactionGraph() {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        processTransactionData();
    }, []);

    const processTransactionData = async () => {
        try {
            const response = await fetch('/api/transactions');
            const transactions = await response.json();

            // Process last 7 days of transactions
            const today = new Date();
            const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

            // Create data points for spending and savings
            const data = [
                {
                    id: "Spending",
                    color: "red",
                    data: []
                },
                {
                    id: "Savings",
                    color: "green",
                    data: []
                }
            ];

            // Filter and group transactions by date
            transactions
                .filter(t => new Date(t.date) >= lastWeek)
                .forEach(transaction => {
                    const point = {
                        x: new Date(transaction.date).toLocaleDateString(),
                        y: transaction.amount
                    };

                    if (transaction.type === 'spending') {
                        data[0].data.push(point);
                    } else {
                        data[1].data.push(point);
                    }
                });

            setGraphData(data);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };

    return (
        <div style={{ height: '350px' }}>
            <ResponsiveLine
                data={graphData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickRotation: -45,
                    legend: 'Date',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickRotation: 0,
                    legend: 'Amount ($)',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enableSlices="x"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        symbolSize: 12,
                        symbolShape: 'circle'
                    }
                ]}
            />
        </div>
    );
}

export default TransactionGraph;