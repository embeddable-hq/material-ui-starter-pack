import {DataResponse, Dataset, Dimension, DimensionOrMeasure, Measure} from "@embeddable.com/core";
import React from "react";
import MUI from "../MUI";
import Loading from "../util/Loading";
import Error from "../util/Error";
import {BarChart} from "@mui/x-charts";

type Props = {
    ds: Dataset;
    xAxis: Dimension;
    metrics: Measure[];
    results: DataResponse;
};

export default (props: Props) => {
    const { xAxis, metrics, results } = props;
    const { isLoading, data, error } = results;

    if(isLoading) {
        return <Loading />
    }

    if(error) {
        return <Error msg={error}/>;
    }

    const labels = data.map((d) => { return d[xAxis.name]; }) || [] as string[]
    const series = metrics.map((m) => {
        return {
            data: data.map((d) => parseFloat(d[m.name])) || [],
            label: m.title
        };
    }) || [];

    return (
        <MUI>
            <BarChart
                xAxis={[{scaleType: 'band', data: labels }]}
                series = {series}
                barLabel="value"
                />
        </MUI>
    )
}