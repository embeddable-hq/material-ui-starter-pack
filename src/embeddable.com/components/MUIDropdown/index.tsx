import {DataResponse} from '@embeddable.com/core';
import React, {
    useCallback,
    useMemo, useState,
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
    const [_, setValue] = useState(props.defaultValue);

    const onChange = useCallback((value: string) => {props.onChange(value); setValue(value)}, [setValue, props]);

    const optionList = useMemo(
        () => props.options?.data?.reduce(
            (memo, o, i: number) => {
                memo.push(o[props.property.name]);
                return memo;
            }, []), [props.options]
    ) as any[];

    return (
        <MUI>
            {optionList &&
                (<Autocomplete
                    disablePortal
                    autoComplete
                    disableClearable={props.unclearable}
                    onChange={(_: any, newValue: string | null) => {
                        onChange(newValue);
                    }}
                    sx={{width: props.minDropdownWidth}}
                    options={optionList}
                    renderInput={(params) => <TextField {...params} label={props.placeholder}/>}
                />)}
        </MUI>
    );
};
