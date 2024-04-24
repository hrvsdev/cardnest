import Svg, { G, Path, Polygon } from "react-native-svg";

import { TH_WHITE_85 } from "@styles/colors.ts";

export function Rupay({ width = 84 }: { width?: number }) {
	const aspectRatio = 100 / 25.81;

	return (
		<Svg
			style={{ width, aspectRatio, overflow: "visible" }}
			viewBox="2.0793 12.5612 27.6673 7.1436"
		>
			<G xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 1.9999999999999996, 12)">
				<G>
					<Path
						d="M0.0819475446,5.96459622 C0.0542249522,5.94636364 0.244805901,5.21217127 0.699207481,3.58666933 C1.06075831,2.29331628 1.40078803,1.08347934 1.45482919,0.898141944 L1.5530857,0.561164859 L2.97371042,0.587101653 C4.63445029,0.617423367 4.89009827,0.639367331 5.15725236,0.774535043 C5.63087397,1.01416565 5.76125506,1.38286408 5.5980417,2.02102179 C5.45903198,2.56454446 5.19346229,2.93444821 4.67996765,3.29977894 C4.58258009,3.36906636 4.49750427,3.4537691 4.49091023,3.48800827 C4.48359133,3.52601207 4.54428033,3.60974254 4.64671424,3.70296549 C4.73900018,3.78695321 4.83709682,3.89935474 4.86470729,3.9527469 C4.93899937,4.096412 4.92609964,4.38426636 4.82301196,4.88316256 C4.77246941,5.12776449 4.72162854,5.47733344 4.71003232,5.65998291 L4.68894847,5.99207165 L4.00132387,5.99207165 C3.51437318,5.99207165 3.30112608,5.97949914 3.2706171,5.94899003 C3.20352001,5.88189266 3.21869643,5.71073693 3.33523988,5.22018874 C3.46493885,4.67426788 3.47278787,4.46002777 3.36797147,4.32677487 C3.22950908,4.15074877 3.10393398,4.11268551 2.60682466,4.09606486 C2.20574006,4.08265423 2.13886342,4.08868358 2.07802948,4.14373747 C1.98343932,4.22934057 1.90665855,4.45041289 1.68234681,5.28301668 L1.49132022,5.99207165 L0.806686506,5.99151843 C0.430137931,5.99124182 0.104005402,5.97909875 0.0819475446,5.96459207 L0.0819475446,5.96459207 L0.0819475446,5.96459622 Z M3.69631487,2.91855365 C4.02279588,2.82159857 4.16033073,2.60866335 4.16077482,2.19946198 C4.16092004,2.07634744 4.1400704,1.98970774 4.09814742,1.93907336 C3.99904808,1.81938114 3.70055914,1.77874889 3.14067506,1.8087366 L2.65397442,1.83480339 L2.5831017,2.07348455 C2.47366492,2.44203845 2.39691712,2.79838498 2.40889685,2.88233328 C2.41673508,2.93725992 2.45466357,2.96524154 2.54540618,2.98304261 C2.74418767,3.02203735 3.4882357,2.98034569 3.69631487,2.91855365 L3.69631487,2.91855365 L3.69631487,2.91855365 Z"
						fill={TH_WHITE_85}
					/>
					<Path
						d="M5.99899173,6.06989033 C5.78154684,5.99212973 5.61059221,5.84696335 5.53876243,5.6790868 C5.40221866,5.35996335 5.52776645,4.6506622 6.02622734,2.92508228 C6.14559751,2.5118445 6.24326402,2.16969002 6.24326402,2.16473874 C6.24326402,2.15978747 6.26865154,2.13034952 6.29968068,2.09932038 C6.34573154,2.05326938 6.4508453,2.04290351 6.87176833,2.04290351 C7.15538714,2.04290351 7.42759589,2.05817087 7.47667712,2.07683219 L7.56591623,2.11076017 L7.4768825,2.42687206 C7.25855828,3.20202931 7.03212392,4.14231709 6.99297981,4.43632596 C6.95742468,4.7033746 6.95878767,4.77436453 7.00116947,4.8627918 C7.0975817,5.06395183 7.44758216,5.10649683 7.74544764,4.95326458 C8.09489903,4.77349391 8.16044671,4.6196296 8.72218537,2.66048231 C8.80455009,2.37322335 8.86737388,2.22394312 8.93748765,2.14888568 L9.03649032,2.04290351 L9.59763703,2.04290351 C10.0315989,2.04290351 10.1629398,2.05373201 10.177118,2.09067985 C10.1911607,2.12727433 9.47804717,4.78233705 9.17747024,5.81256444 L9.13033494,5.9741212 L8.53042583,5.99207165 C8.20047527,6.00194515 7.930543,5.99993698 7.9305762,5.98761135 C7.93060939,5.97528434 7.95510298,5.89585096 7.98500771,5.81109289 C8.10632361,5.46724626 7.95506702,5.44567572 7.51324256,5.74381572 C7.07666395,6.03841585 6.89362862,6.10820669 6.51565416,6.12419114 C6.26012325,6.13499682 6.14813905,6.12322993 5.99899173,6.06989102 L5.99899173,6.06989102 L5.99899173,6.06989033 Z"
						fill={TH_WHITE_85}
					/>
					<Path
						d="M9.98754227,5.96343101 C9.95563975,5.94315499 10.1403437,5.23063551 10.6877216,3.2623906 L11.4312343,0.588891303 L12.6876886,0.599409303 C14.2550801,0.612529489 14.5755479,0.640337532 14.8785776,0.78951818 C15.1277429,0.912181849 15.2463715,1.02187747 15.3572835,1.23217385 C15.5436153,1.58547147 15.5405056,1.99525718 15.3472261,2.55756911 C15.0501469,3.42186589 14.4956125,3.99015461 13.764635,4.17941154 C13.6461598,4.21008592 13.2745791,4.25158604 12.9389,4.27163386 C11.829937,4.33786407 11.8966174,4.32539806 11.8372187,4.47760617 C11.8088325,4.55034772 11.6980554,4.92086001 11.5910484,5.30096712 L11.3964903,5.99207165 L10.7136826,5.99151843 C10.3381388,5.99124182 10.0113755,5.97857458 9.98754227,5.96342686 L9.98754227,5.96343101 Z M13.2206421,3.08591917 C13.5860772,3.03882605 13.7780601,2.9261078 13.9000039,2.68705046 C14.0310398,2.43016784 14.065624,2.15052527 13.982119,2.02308044 C13.8683199,1.84940136 13.7125,1.81145634 13.1253722,1.81444716 C12.8330154,1.81593392 12.5794396,1.83159751 12.5618702,1.8492506 C12.5216708,1.88964083 12.2747212,2.86575965 12.2747212,2.98426522 C12.2747212,3.03256365 12.2854916,3.0828509 12.298656,3.09601465 C12.3326794,3.13003806 12.9289498,3.12350874 13.2206421,3.08591917 L13.2206421,3.08591917 L13.2206421,3.08591917 Z"
						fill={TH_WHITE_85}
					/>
					<Path
						d="M15.2724992,6.08469159 C14.8497288,5.90760056 14.7401888,5.61493461 14.8779601,5.03057568 C15.0705494,4.21370741 15.4948031,3.94053192 16.9512377,3.69559805 C17.8306352,3.54770639 18.0501723,3.43961579 18.1134172,3.1233898 C18.1602047,2.88945247 17.959712,2.76154017 17.5456084,2.76113425 C17.2870925,2.76085764 17.1901194,2.79857169 16.9658543,2.98647185 L16.785119,3.13789994 L16.3194904,3.14983763 C15.7798063,3.16367422 15.6135638,3.14219704 15.6135638,3.05863806 C15.6135638,2.96128052 15.8252253,2.66385208 16.0231117,2.4831368 C16.2356327,2.2890586 16.5168796,2.14034265 16.8213981,2.06102545 C17.4609845,1.89443444 18.5618713,1.91380042 18.9402137,2.09829832 C19.142727,2.19705272 19.3227349,2.36106437 19.4084611,2.52493426 C19.4896052,2.68004538 19.4605926,2.84099775 19.0782277,4.35695552 C18.8905509,5.10103591 18.736997,5.77333389 18.736997,5.85095065 L18.736997,5.99207165 L18.2932391,5.99207165 C18.0491717,5.99207165 17.7748718,6.00229783 17.6836833,6.01479703 L17.5178861,6.03752172 L17.4449586,5.86738805 C17.3592739,5.66749488 17.3492254,5.66755435 16.897775,5.87061744 C16.4074723,6.09115384 16.2278074,6.14031045 15.8469238,6.1581295 C15.52282,6.17329243 15.4669619,6.16615112 15.2724992,6.08469436 L15.2724992,6.08469367 L15.2724992,6.08469159 Z M17.2021186,5.24584754 C17.4496879,5.13633587 17.7293311,4.68813767 17.7309659,4.3982378 L17.7317542,4.25841548 L17.5036388,4.27971702 C17.2512932,4.30328121 16.7175452,4.47541752 16.5219028,4.59633095 C16.3567204,4.69841987 16.259961,4.8628817 16.2604755,5.04068154 C16.2609595,5.21120384 16.2860596,5.25784954 16.404411,5.30826956 C16.5395462,5.36584057 17.0149563,5.32863824 17.2021186,5.24584754 L17.2021186,5.24584754 Z"
						fill={TH_WHITE_85}
					/>
					<Path
						d="M19.1793982,7.69276173 C19.0355935,7.66033227 19.0300786,7.60664898 19.1300798,7.21272394 C19.2640934,6.68481991 19.2552834,6.69580261 19.5859974,6.64438681 C19.9429719,6.58888967 20.1023697,6.51044516 20.181978,6.35108743 C20.2701536,6.17458004 20.2638269,5.48148048 20.1570723,3.62257091 C20.0976653,2.58812041 20.0828861,2.11893877 20.1087289,2.08778031 C20.1359568,2.05495046 20.3176609,2.04290351 20.7855833,2.04290351 L21.4252181,2.04290351 L21.4363903,3.24385859 C21.4440129,4.06317899 21.460247,4.45748229 21.4874769,4.48467903 C21.5528213,4.54994249 21.7930321,4.14372364 22.7774671,2.30318979 L22.916685,2.04290351 L23.4814359,2.04290351 C23.7920489,2.04290351 24.0538295,2.05527064 24.0631719,2.07038585 C24.0811514,2.09947805 23.225399,3.62493728 22.3666842,5.09453356 C21.1461999,7.18325971 20.9166372,7.47110577 20.3440935,7.63062877 C20.1571587,7.68271327 19.3304107,7.72681765 19.1793982,7.69276173 L19.1793982,7.69276173 L19.1793982,7.69276173 Z"
						fill={TH_WHITE_85}
					/>
				</G>
				<Polygon
					points="24.4706243 7.21369324 26.1490212 1.06555565 27.7466391 4.24284088"
					fill={TH_WHITE_85}
				/>
				<Polygon
					points="23.4320067 7.23608461 25.1104036 1.08794703 26.7080215 4.26523225"
					fill={TH_WHITE_85}
				/>
			</G>
		</Svg>
	);
}
