import React from 'react';

interface Props {
    checked: boolean;
    label: string;
    onChange: (checked: boolean) => void;
}

/**
 * Component to show CheckBox and its Label.
 *
 * @param {Props} props
 * @constructor
 */
export const CheckboxAndLabel: React.FC<Props> = (props: Props) => (
    <div>
        <input type='checkbox' checked={props.checked} onChange={(): void => props.onChange(!props.checked)} />
        <label>{props.label}</label>
    </div>
);
