import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Description.module.css";
import { faFolder, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface groupNameEdit {
	name: string;
}

export default function Description() {
	const [groupName, setGroupName] = useState<boolean>(false);
	const { register, handleSubmit, errors } = useForm<groupNameEdit>();
	return (
		<section className={styles.section3}>
			<section className={styles.section3__folderImage}>
				<FontAwesomeIcon icon={faFolder} size={"5x"} color={"#ffc000"} />
				{groupName ? (
					<form>
						<input
							type="text"
							name="groupName"
							ref={register({ required: true })}
						/>
						<input
							className={styles.secttion3__folderImage__submit}
							type="submit"
							value="수정"
							onClick={() => {
								setGroupName(!groupName);
							}}
						/>
					</form>
				) : (
					<div
						onClick={() => {
							setGroupName(!groupName);
						}}
					>
						새 그룹
					</div>
				)}
			</section>
			<section className={styles.section3__description}>
				<div className={styles.section3__description__text}>
					<div>주최기관</div>
					<div>|</div>
				</div>
				<div className={styles.section3__description__text}>
					<div>최근 업데이트 일자 | </div>
					<div>|</div>
				</div>
				<div className={styles.section3__description__text}>
					<div>현재 선택된 폼 목록</div>
					<div> | </div>
				</div>
			</section>
			<section className={styles.section3__button}>
				<div className={styles.section3__button__imgBorder}>
					<FontAwesomeIcon icon={faPen} size={"lg"} />
				</div>
				<div className={styles.section3__button__blank}></div>
			</section>
		</section>
	);
}
