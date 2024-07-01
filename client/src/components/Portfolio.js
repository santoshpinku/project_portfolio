import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = ({ userId }) => {
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/portfolios/${userId}`);
                setPortfolio(response.data);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };

        fetchPortfolio();
    }, [userId]);

    return (
        <div>
            {portfolio ? (
                <div>
                    {portfolio.projects.map((project, index) => (
                        <div key={index}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading portfolio...</p>
            )}
        </div>
    );
};

export default Portfolio;
