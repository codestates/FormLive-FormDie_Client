import styles from "../styles/Form.module.css";
import FormCard from "../components/FormCard";
import Description from "../components/Description";
import {
	faChevronRight,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../components/SearchBar";

export default function Form() {
	interface data {
		formId: number;
		title: string;
		description: string;
		date: string;
	}
	let formData: Array<data> = [
		{
			formId: 1,
			title: "Title1",
			description: "description1",
			date: "2021-01-20",
		},
		{
			formId: 2,
			title: "Title2",
			description: "description2",
			date: "2021-01-20",
		},
		{
			formId: 3,
			title: "Title3",
			description: "description3",
			date: "2021-01-20",
		},
		{
			formId: 4,
			title: "Title4",
			description: "description4",
			date: "2021-01-20",
		},
		{
			formId: 5,
			title: "Title5",
			description: "description5",
			date: "2021-01-20",
		},
		{
			formId: 6,
			title: "Title6",
			description: "description6",
			date: "2021-01-20",
		},
		{
			formId: 7,
			title: "Title7",
			description: "description7",
			date: "2021-01-20",
		},
		{
			formId: 8,
			title: "Title8",
			description: "description8",
			date: "2021-01-20",
		},
		{
			formId: 9,
			title: "Title9",
			description: "description9",
			date: "2021-01-20",
		},
		{
			formId: 10,
			title: "Title10",
			description: "description10",
			date: "2021-01-20",
		},
		{
			formId: 11,
			title: "Title11",
			description: "description11",
			date: "2021-01-20",
		},
		{
			formId: 12,
			title: "Title12",
			description: "description12",
			date: "2021-01-20",
		},
	];
	return (
		<div className={styles.container}>
			<section className={styles.section1}>
				<section className={styles.section1__topMenu}>
					<article className={styles.section1__article}>Form</article>
					<section className={styles.section1__sort}>
						<div>최신순</div>
						<div>|</div>
						<div>인기순</div>
					</section>
					<SearchBar />
				</section>
				<section className={styles.section1__description}>
					<article>
						* 원하는 폼을 클릭 시, 최대 10개의 폼 목록을 한 번에 작성할 수
						있어요.
					</article>
					<article className={styles.section1__description__count}>
						(총 56개)
					</article>
				</section>
			</section>
			<section className={styles.section2}>
				<section className={styles.section2__left}>
					<FontAwesomeIcon icon={faChevronLeft} size={"lg"} color={"#000000"} />
				</section>
				<section className={styles.section2__formData}>
					{formData.map((data, idx) => (
						<FormCard
							formId={data.formId}
							title={data.title}
							description={data.description}
							date={data.date}
							key={idx}
						/>
					))}
				</section>
				<section className={styles.section2__right}>
					<FontAwesomeIcon
						icon={faChevronRight}
						size={"lg"}
						color={"#000000"}
					/>
				</section>
			</section>
			<Description />
		</div>
	);
}
