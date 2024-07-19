import React from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import './styles.css';


const SelectComponent = ({value, change, type= 'task'}) => (
    <Select.Root value={value} onValueChange={change}>
        <Select.Trigger className="SelectTrigger" aria-label="Timeframe">
            <Select.Value placeholder="Select an option" />
            <Select.Icon className="SelectIcon">
                <ChevronDownIcon />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">
                    {type === 'task' ?
                    <>
                    <Select.Group>
                        <Select.Label className="SelectLabel">Frequency</Select.Label>
                        <SelectItem value="1 day">1 Day</SelectItem>
                        <SelectItem value="2 day">2 Days</SelectItem>
                        <SelectItem value="3 day">3 Days</SelectItem>
                        <SelectItem value="4 day">4 Days</SelectItem>
                        <SelectItem value="5 day">5 Days</SelectItem>
                        <SelectItem value="6 day">6 Days</SelectItem>
                    </Select.Group>
                    <Select.Group>
                        <SelectItem value="1 week">1 Week</SelectItem>
                        <SelectItem value="2 week">2 Weeks</SelectItem>
                        <SelectItem value="3 week">3 Weeks</SelectItem>
                    </Select.Group>
                    <Select.Group>
                        <SelectItem value="1 month">1 Month</SelectItem>
                        <SelectItem value="2 month">2 Months</SelectItem>
                        <SelectItem value="3 month">3 Months</SelectItem>
                        <SelectItem value="4 month">4 Months</SelectItem>
                        <SelectItem value="5 month">5 Months</SelectItem>
                        <SelectItem value="6 month">6 Months</SelectItem>
                        <SelectItem value="7 month">7 Months</SelectItem>
                        <SelectItem value="8 month">8 Months</SelectItem>
                        <SelectItem value="9 month">9 Months</SelectItem>
                        <SelectItem value="10 month">10 Months</SelectItem>
                        <SelectItem value="11 month">11 Months</SelectItem>
                    </Select.Group>
                    <Select.Group>
                        <SelectItem value="1 year">1 Year</SelectItem>
                    </Select.Group>
                    </>
                        :
                    <Select.Group>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                    </Select.Group>
                    }
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                    <ChevronDownIcon />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
);

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="SelectItemIndicator">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
});

export default SelectComponent;