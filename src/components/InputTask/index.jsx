import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

import styles from './index.module.scss';

export const InputTask = ({title, id, onDone, onRemove, onEdited}) => {

    const [checked, setChecked] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setValue] = useState(title)
    const editorInputRef = useRef(null)

    useLayoutEffect(() => {

        if (isEditMode && editorInputRef) {
            editorInputRef.current.focus()
        }

    }, [isEditMode])


    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={
                    (event) => {
                        setChecked(event.target.checked)
                        setTimeout(() => {
                            onDone(id)
                        }, 300)
                    }}
                    className={styles.inputTaskCheckbox}
                />
                {
                    isEditMode ?
                        <input
                            value={value}
                            className={styles.inputTaskTitleEdit}
                            onChange={(event) => setValue(event.target.value)}
                            ref={editorInputRef}

                        />
                        :
                        <h3 className={styles.inputTaskTitle}>{title}</h3>
                }

            </label>
            {
                isEditMode ?
                    <button
                        onClick={() => {
                           onEdited(id, value)
                            setIsEditMode(false)
                        }}
                        aria-label="Save"
                        className={styles.inputTaskSave}
                    />
                    :
                    <button
                        onClick={() => {
                            setIsEditMode(true)
                        }}
                        aria-label="Edit"
                        className={styles.inputTaskEdit}
                    />
            }

            <button
                onClick={() => {
                     if ( window.confirm('Are you sure?') ) {
                         onRemove(id)
                     }
                }}
                aria-label="Remove"
                className={styles.inputTaskRemove}
            />
        </div>
    );
}

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>

<button
    aria-label="Save"
    className={styles.inputTaskSave}
/>
*/