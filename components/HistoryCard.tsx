import { FC } from "react";
import styles from "../styles/HistoryCard.module.css";
import { faFolder, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HISTORY_LIST_REQUEST } from "../reducers/history";
import { historyQuery } from "../pages/history";

interface Props {
	groupId: number;
	title: string;
	updatedAt: string;
	forms: [{ id: number; title: string }];
}
const HistoryCard: FC<Props> = ({ groupId, title, updatedAt, forms }) => {
	const dispatch = useDispatch();
	const queryParameter: historyQuery = {
		page: 1,
	};
	const LIGHT_GREEN = "#83cd7f";
	const onDeleteClick = () => {
		console.log(groupId);
		axios
			.delete("/group", { data: { groupId: groupId }, withCredentials: true })
			.then((result) =>
				dispatch({ type: HISTORY_LIST_REQUEST, data: queryParameter })
			);
	};
	return (
		<section className={styles.container}>
			<div className={styles.section}>
				<FontAwesomeIcon icon={faFolder} size={"2x"} color={LIGHT_GREEN} />
				<div className={styles.section__title}>{title}</div>
			</div>
			<section className={styles.description}>
				<div className={styles.description__text}>
					<div>주최기관</div>
					<span>｜</span>
					<span>{title}</span>
				</div>
				<div className={styles.description__text}>
					<div>최근 업데이트 일자</div>
					<span>｜</span>
					<span>{new Date(updatedAt).toLocaleDateString("ko")}</span>
				</div>
				<div className={styles.description__text}>
					<div>선택된 폼 목록</div>
					<span> ｜ </span>
					<span>{forms.map((el) => el.title).join(", ")}</span>
					<span>(총 {forms?.length}개)</span>
				</div>
			</section>
			<div className={styles.buttons}>
				<div className={styles.buttons__viewButton}>
					<FontAwesomeIcon icon={faEye} size={"sm"} />
				</div>
				<div
					className={styles.buttons__delete}
					onClick={() => {
						onDeleteClick();
					}}
				>
					<FontAwesomeIcon icon={faTrashAlt} size={"sm"} />
				</div>
			</div>
		</section>
	);
};
export default HistoryCard;
