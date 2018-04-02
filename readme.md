## Simple TimePicker React
Demo

## Usage
`npm i simple-timepicker-react`

```
import SimpleTimePickerReact from 'simple-timepicker-react'

...
render() {
   return <SimpleTimePickerReact onChange={time => console.log(time} />
}
...

```

Options
----
|  prop |   type | default value |
| ------------- | ------------- | ------------- |
| width  | Number  | 200  |
| fuildWdith  | Bool  | false  |
| placeholderText  | String  | --:--  |
| hourInterval  | Number  | 1  |
| minuteInterval  | Number  | 1  |
| visiblePicker | Bool | false |
| onChange  | Func  |   |
| value | String | null