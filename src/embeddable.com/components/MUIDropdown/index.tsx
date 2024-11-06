import {DataResponse} from '@embeddable.com/core';
import {useEmbeddableState} from '@embeddable.com/react';
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import MUI from '../MUI'
import {Autocomplete, TextField} from "@mui/material";

export type Props = {
    icon?: ReactNode;
    className?: string;
    options: DataResponse;
    unclearable?: boolean;
    inputClassName?: string;
    onChange: (v: string) => void;
    searchProperty?: string;
    minDropdownWidth?: number;
    property?: { name: string; title: string; nativeType: string; __type__: string };
    title?: string;
    defaultValue?: string;
    placeholder?: string;
    ds?: { embeddableId: string; datasetId: string; variableValues: Record };
};

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
                    sx={{width: 300}}
                    options={optionList}
                    renderInput={(params) => <TextField {...params} label={props.placeholder}/>}
                />)}
        </MUI>
    );
};
