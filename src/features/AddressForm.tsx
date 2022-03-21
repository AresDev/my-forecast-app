import React, { useEffect, useRef, useState } from 'react';

export interface IProps{
    onSearchClicked: (address:string)=>{}
}

const AddressForm = (props:IProps)=>{
    const inputRef = useRef<HTMLInputElement>(null);

    const [address, setAddress] = useState<string>('');

    useEffect(()=>{
        inputRef.current?.focus();
    }, [])

    const onSearchClicked = () => {
      props.onSearchClicked(address);
    };

    const onInputChange = (e: any) => {
      setAddress(e.target.value);
    };

    return (<div>
      <input type="text" ref={inputRef} onChange={onInputChange} />
      <button onClick={onSearchClicked}>Get Forecast</button>
    </div>);
}



export default AddressForm;