import {DataResponse} from '@embeddable.com/core';
import React, {
    useMemo,
} from 'react';
import MUI from '../MUI'
import {Autocomplete, TextField} from "@mui/material";

export type Props = {
    options: DataResponse;
    unclearable?: boolean;
    onChange: (v: string) => void;
    minDropdownWidth?: number;
    property?: { name: string; title: string; nativeType: string; __type__: string };
    title?: string;
    defaultValue?: string;
    placeholder?: string;
    ds?: { embeddableId: string; datasetId: string; variableValues: Record };
};

type Record = { [p: string]: string };

export default (props: Props) => {
    const optionList = useMemo(
        () => props.options?.data?.reduce(
            (memo, o, i: number) => {
                memo.push({label: o[props.property.name], index: i});
                return memo;
            }, []), [props.options]
    ) as any[];

    return (
        <MUI>
            {optionList &&
                (<Autocomplete
                    disablePortal
                    disableClearable={props.unclearable}
                    defaultValue={optionList.find((o) => o.label === props.defaultValue)}
                    sx={{width: props.minDropdownWidth}}
                    options={optionList}
                    renderInput={(params) => <TextField {...params} label={props.placeholder}/>}
                />)}
        </MUI>
    );
};
