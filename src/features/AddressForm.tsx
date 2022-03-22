import React, { useEffect, useRef, useState } from 'react';
import "./AddressForm.scss";
export interface IProps{
    onSearchClicked: (address:string)=>{}
}

const AddressForm = (props:IProps)=>{
    const inputRef = useRef<HTMLInputElement>(null);

    const [address, setAddress] = useState<string>(
      "11490 NW 80TH ST Medley Florida"
    );

    useEffect(()=>{
        inputRef.current?.focus();
    }, [])

    const onSearchClicked = () => {
      props.onSearchClicked(address);
    };

    const onInputChange = (e: any) => {
      setAddress(e.target.value);
    };

    return (
      <p className="address-container">
        <label htmlFor="input">Please enter the address</label>
        <div className="input-container">
          <input
            id="input"
            type="text"
            value={address}
            ref={inputRef}
            onChange={onInputChange}
            className="address-input"
          />
          <button onClick={onSearchClicked}>Get Forecast</button>
        </div>
      </p>
    );
}



export default AddressForm;