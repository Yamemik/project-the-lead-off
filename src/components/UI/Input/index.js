import { useDropzone } from "react-dropzone";
import "./Input.scss";
import { useCallback } from "react";
import { useState } from "react";

const Input = ({ type = "text", placeholder, addClass, value, setValue, setFiles }) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
    }, [setFiles]);

    const { getRootProps, acceptedFiles } = useDropzone({ onDrop });

    return type === "upload" ? (
        <>
            <div {...getRootProps()} className="input__box">
                <input className="input__box-input" placeholder="Прикрепить" readOnly />
                <img className="input__box-icon" src="/img/UI/clip.svg" alt="Скрепка" />
            </div>
            {
                acceptedFiles.length > 0 && (
                    acceptedFiles.map(({name}) => (
                        <div className="input__file">
                            <p>{name.length > 12 ? name.slice(0, 4) + "..." + name.slice(name.length - 8, name.length) : name}</p>
                            <img className="input__file-delete" src="/img/UI/delete.svg" alt="Удалить файл"/>
                        </div>
                    ))
                )
            }
        </>
    ) : (
        <input
            value={value}
            onChange={e => setValue(e.target.value)}
            className={`input ${addClass}`}
            type={type}
            placeholder={placeholder}
            min={type === "number" && 0}
        />
    );
};

export default Input;
