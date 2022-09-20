import React from 'react';
import './Matrix.css'

const DrawMatrix = ({matrix, findAverage}) => {

    return (
        <div>
            {
                matrix.length !== 0 &&
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            {matrix.map((item, index) => {
                                index++
                                return <th key={index}>{index}</th>;

                            })}
                            <th>Sum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {matrix.map((item, index) => {
                            index++
                            return (
                                <tr>
                                    <td>{index}</td>
                                    {
                                        item.map((i) => {
                                            return <>
                                                <td key={i.id} className="table_td">{i.amount}</td>
                                            </>
                                        })
                                    }
                                    <td>
                                        {
                                            item.reduce((prev, current) => {
                                                return prev + current.amount
                                            }, 0)
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>

                        <tfoot>
                        {
                            <tr>
                                <th>Avg</th>
                                {
                                    matrix[0].map((item, index) => {
                                        return <th key={index}>{findAverage(index)}</th>;
                                    })
                                }
                            </tr>
                        }
                        </tfoot>
                    </table>
                </div>
            }
        </div>
    );
};

export default DrawMatrix;