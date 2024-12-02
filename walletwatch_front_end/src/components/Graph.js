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
                    data: []
                },
                {
                    id: "Savings",
                    data: []
                }
            ];
            // Filter and group transactions by date
            // Sort transactions by date in ascending order
            const sortedTransactions = transactions
                .filter(t => new Date(t.date) >= lastWeek)
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            sortedTransactions.forEach(transaction => {
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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
        <div style={{ height: '350px', width: '1000px', fontWeight: 'bold'}}>
            <ResponsiveLine
                data={graphData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                colors={['#ff0000', '#2e7d32']} // Set explicit colors: red for spending, green for savings
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: '#000000',
                                fontSize: 12,
                            }
                        },
                        legend: {
                            text: {
                                fill: '#000000',
                                fontSize: 14,
                            }
                        }
                    },
                    legends: {
                        text: {
                            fill: '#000000',
                            fontSize: 12,
                        }
                    }
                }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                axisTop={null}
                axisRight={null}
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
                        itemDirection: 'right-to-left',
                        itemWidth: 80,
                        itemHeight: 20,
                        symbolSize: 12,
                        symbolShape: 'circle'
                    }
                ]}
            />
        </div>
    </div>
    );
}

export default TransactionGraph;