import { useDropzone } from "react-dropzone";
import "./Input.scss";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Input = ({
	oldFiles,
	type = "text",
	placeholder,
	addClass,
	value,
	setValue,
	setFiles,
	setFilesType,
	curVal,
	setCurVal,
}) => {
	const [currentFiles, setCurrentFiles] = useState([]);
	const [loadedOldFiles, setLoadedOldFiles] = useState(false);

	const onDrop = useCallback(async acceptedFiles => {
		await setCurrentFiles([]);
		await acceptedFiles.map(file => {
			setCurrentFiles(prev => [
				...prev,
				{ open: setFilesType, file: file },
			]);
		});
	}, []);

	useEffect(() => {
		if (!loadedOldFiles) {
			if (oldFiles && oldFiles.length > 0) {
				oldFiles.map(file =>
					setCurrentFiles(prev => [
						...prev,
						{ file: file, open: file.open },
					]),
				);
				setLoadedOldFiles(true);
			}
		}
	}, [oldFiles, loadedOldFiles]);

	useEffect(() => {
		if (typeof setFiles === "function") {
			setFiles(currentFiles);
		}
	}, [currentFiles]);

	useEffect(() => {
		if (curVal) {
			setCurrentFiles([]);
			try {
				setCurVal();
			} catch {}
		}
	}, [curVal]);

	const { getRootProps, acceptedFiles } = useDropzone({ onDrop });

	const handleDeleteFile = filename => {
		console.log({ filename });
		setCurrentFiles(
			currentFiles.filter(file => file.file.path !== filename),
		);
	};

	const getFilename = file => {
		if (file?.originalname) {
			return (
				<a
					href={`/uploads/${file.path}`}
					download={file.originalname}
					className="order__row-text-upload"
					target="_blank"
				>
					{file.originalname.length > 12
						? file.originalname.slice(0, 4) +
						  "..." +
						  file.originalname.slice(
								file.originalname.length - 8,
								file.originalname.length,
						  )
						: file.originalname}
				</a>
			);
		}
		return file.path.length > 12
			? file.path.slice(0, 4) +
					"..." +
					file.path.slice(file.path.length - 8, file.path.length)
			: file.path;
	};

	return type === "upload" ? (
		<>
			<div {...getRootProps()} className="input__box">
				<input
					className="input__box-input"
					placeholder="Прикрепить"
					readOnly
				/>
				<img
					className="input__box-icon"
					src="/img/UI/clip.svg"
					alt="Скрепка"
				/>
			</div>
			{currentFiles &&
				currentFiles.length > 0 &&
				currentFiles.map(({ file }) => (
					<div className="input__file">
						<p>{getFilename(file)}</p>
						<img
							className="input__file-delete"
							src="/img/UI/delete.svg"
							alt="Удалить файл"
							onClick={() => handleDeleteFile(file.path)}
						/>
					</div>
				))}
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
