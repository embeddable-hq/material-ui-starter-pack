import {DataResponse} from '@embeddable.com/core';
import React, {
    useCallback,
    useMemo, useState,
} from 'react';
import MUI from '../MUI'
import {Autocomplete, TextField} from "@mui/material";

export type Props = {
    options: DataResponse;
    clearable: boolean;
    multiValue: boolean
    onChange: (v: string) => void;
    minDropdownWidth?: number;
    property?: { name: string; title: string; nativeType: string; __type__: string };
    title?: string;
    defaultValue?: string;
    placeholder?: string;
    ds?: { embeddableId: string; datasetId: string; variableValues: Record };
};

type Record = { [p: string]: string };

const getOptionLabel = (option: any) => {
    if (Array.isArray(option)) {
        return option.length === 0 ? "" : option[0];
    }
    return option;
};

export default (props: Props) => {
    const [_, setValue] = useState(props.defaultValue);

    const onChange = useCallback((value: string) => {
        props.onChange(value);
        setValue(value)
    }, [setValue, props]);

    const optionList = useMemo(
        () => props.options?.data?.reduce(
            (memo, o) => {
                memo.push(o[props.property.name]);
                return memo;
            }, []), [props.options]
    ) as any[] || [];
    const placeHolder = optionList.length === 0 ? 'No results' : props.placeholder;
    return (
        <MUI>
            <Autocomplete
                multiple={props.multiValue === true}
                disablePortal
                autoComplete
                readOnly={optionList.length === 0}
                disableClearable={props.clearable === false}
                value={props.defaultValue || []}
                onChange={(_: any, newValue: string | null) => {
                    onChange(newValue);
                }}
                sx={{width: props.minDropdownWidth}}
                getOptionLabel={getOptionLabel}
                options={optionList}
                renderInput={(params) => <TextField {...params} label={placeHolder}/>}
            />
        </MUI>
    );
};
