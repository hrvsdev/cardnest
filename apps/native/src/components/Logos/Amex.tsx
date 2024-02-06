import Svg, { G, Path } from "react-native-svg";

import { themeColors } from "../../styles/colors.ts";

export function Amex({ width = 72 }: { width?: number }) {
	const aspectRatio = 100 / 34.19;

	return (
		<Svg style={{ width, aspectRatio, overflow: "visible" }} viewBox="0.0009 15.762 47.9011 16.378">
			<G transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, -4.440892098500626e-16)">
				<Path
					d="m34.554 17.56-.881 2.139h1.771zM4.105 17.56l-.871 2.139h1.749zM24.32 17.863c-.152-.086-.386-.097-.608-.097h-1.58v1.191h1.559c.247 0 .455-.004.634-.11.165-.087.264-.276.264-.51 0-.23-.103-.396-.269-.474zM29.816 27.093c-.156-.093-.386-.097-.612-.097h-1.58v1.205h1.559c.25 0 .463-.008.636-.109.166-.102.265-.285.265-.516-.003-.231-.102-.397-.268-.483zM23.571 26.994h-1.672v1.367h1.656c.493 0 .8-.244.8-.707-.001-.472-.32-.66-.784-.66z"
					fill={themeColors.white["85"]}
				/>
				<Path
					d="M47.262 27.8a.332.332 0 0 0-.028-.026.887.887 0 0 0 .405-.744v-1.143a.886.886 0 0 0-.887-.887h-2.57c-.801 0-1.405.236-1.845.592a.875.875 0 0 0-.826-.592h-2.57c-.707 0-1.264.175-1.688.463A.872.872 0 0 0 36.49 25h-4.28a.88.88 0 0 0-.783.488c-.061-.043-.106-.093-.17-.131-.621-.332-1.281-.357-1.961-.357h-2.963a.879.879 0 0 0-.783.492c-.451-.293-1.082-.492-1.979-.492h-4.098c-.247 0-.482.1-.651.282l-.971 1.047-.932-1.035a.869.869 0 0 0-.659-.295h-5.158a.886.886 0 0 0-.886.887v5.367c0 .491.397.887.886.887h5.081a.883.883 0 0 0 .65-.285l.979-1.059.929 1.045c.168.19.41.297.663.297h2.493a.886.886 0 0 0 .887-.885v-.916h.713c.867 0 1.494-.178 1.95-.449v1.365c0 .489.397.885.887.885h1.289a.886.886 0 0 0 .887-.885v-1.076h.483c.118 0 .201.004.261.008.004.096.004.211.002.287v.781c0 .489.399.885.887.885h1.287a.844.844 0 0 0 .392-.1c.12.059.249.1.391.1h4.281a.877.877 0 0 0 .385-.096.867.867 0 0 0 .385.096h2.498c.795 0 1.443-.195 1.928-.539a.883.883 0 0 0 .814.539h2.498c1.817 0 2.9-.965 2.9-2.58 0-.748-.202-1.305-.64-1.758zm-23.764 1.65h-1.6v1.801h-2.493l-1.58-1.776-1.642 1.776h-5.081v-5.368h5.158l1.58 1.76 1.632-1.76h4.098c1.017 0 2.162.285 2.162 1.771 0 1.489-1.112 1.799-2.234 1.796zm7.093-.691c.284.104.517.293.625.451.183.262.207.506.213.979v1.064h-1.287v-.672c0-.322.031-.801-.209-1.051-.184-.191-.469-.236-.939-.236h-1.37v1.959h-1.289v-5.367h2.963c.648 0 1.12.027 1.543.252.404.244.659.58.659 1.191 0 .858-.573 1.295-.909 1.43zm5.901-1.764h-3.004v.977h2.93v1.096h-2.93v1.066l3.004.006v1.113h-4.28v-5.367h4.28v1.109zm3.271 4.252h-2.498v-1.153h2.487c.242 0 .415-.03.523-.133a.477.477 0 0 0 .15-.351.453.453 0 0 0-.156-.354c-.1-.082-.232-.119-.457-.119-1.198-.039-2.701.037-2.701-1.66 0-.781.488-1.598 1.834-1.598h2.57v1.142h-2.353c-.235 0-.386.01-.514.098-.141.088-.194.217-.194.387 0 .203.119.338.28.4.137.047.281.061.5.061l.689.02c.695.019 1.174.139 1.463.432.252.259.385.587.385 1.138 0 1.157-.719 1.696-2.008 1.69zm5.241 0h-2.498v-1.153h2.488c.242 0 .415-.03.522-.133a.477.477 0 0 0 .15-.351.453.453 0 0 0-.156-.354c-.099-.082-.231-.119-.457-.119-1.199-.039-2.701.037-2.701-1.66 0-.781.488-1.598 1.834-1.598h2.57v1.142h-2.352c-.236 0-.388.01-.515.098-.141.088-.193.217-.193.387 0 .203.12.338.279.4.138.047.281.061.5.061l.689.02c.696.019 1.176.139 1.465.432.25.259.385.587.385 1.138 0 1.157-.721 1.696-2.01 1.69zM43.236 15.762h-1.313a.886.886 0 0 0-.887.886v.554l-.609-1.011a.89.89 0 0 0-.758-.428h-1.955a.886.886 0 0 0-.886.886v.753l-.471-1.102a.885.885 0 0 0-.813-.537h-1.922a.878.878 0 0 0-.529.176.88.88 0 0 0-.531-.176h-1.239c-1.054 0-1.834.255-2.408.753a.875.875 0 0 0-.859-.753h-1.31a.883.883 0 0 0-.789.499c-.055-.04-.097-.088-.159-.124-.602-.348-1.235-.375-1.998-.375h-2.95a.867.867 0 0 0-.445.137.855.855 0 0 0-.444-.137h-4.284a.862.862 0 0 0-.478.159.868.868 0 0 0-.478-.159h-2.138a.885.885 0 0 0-.814.541l-.762 1.796-.839-1.822a.89.89 0 0 0-.805-.515H7.269a.886.886 0 0 0-.886.886v.771l-.481-1.122a.887.887 0 0 0-.815-.536H3.183a.888.888 0 0 0-.815.537L.072 21.666a.887.887 0 0 0 .814 1.235H2.28a.886.886 0 0 0 .816-.546l.271-.652h1.486l.267.648c.136.332.46.549.82.549h2.609c.49 0 .886-.397.886-.886v-.021l.168.381c.142.32.46.527.81.527l1.127.002a.884.884 0 0 0 .81-.528l.17-.38v.022c0 .489.396.885.886.885h1.315c.18 0 .337-.068.478-.159a.87.87 0 0 0 .478.159h4.284a.855.855 0 0 0 .444-.137.864.864 0 0 0 .445.137h1.284c.49 0 .886-.397.886-.886V20.95h.49c.111 0 .19.003.249.007.006.091.004.199.004.271l-.002.118.005.677a.888.888 0 0 0 .887.879h1.294a.865.865 0 0 0 .397-.107.872.872 0 0 0 .401.107h1.31c.43 0 .77-.31.853-.714.727.611 1.751.714 2.321.714h1.503c.358 0 .682-.22.817-.555l.261-.643h1.478l.271.652a.886.886 0 0 0 .818.545h2.61c.49 0 .886-.397.886-.886v-.847l.787 1.305a.889.889 0 0 0 .76.428h1.816c.49 0 .886-.397.886-.886v-5.367a.887.887 0 0 0-.886-.886zM14.72 22.014h-1.315l-.005-4.203-1.86 4.203h-1.127L8.55 17.807v4.207H5.939l-.493-1.197h-2.67l-.498 1.197H.884l2.297-5.367h1.904l2.183 5.082v-5.082h2.094l1.679 3.641 1.541-3.641h2.138v5.367zm5.24-4.249h-3.002v.967h2.931v1.1h-2.931v1.072h3.002v1.11h-4.284v-5.367h4.284v1.118zm5.137 1.759c.281.108.521.296.635.452.182.267.213.505.213.984v1.053h-1.294l-.006-.677c0-.322.031-.786-.202-1.045-.187-.188-.473-.229-.935-.229h-1.375v1.952h-1.285v-5.366h2.95c.656 0 1.139.017 1.553.257.406.24.649.59.649 1.189 0 .855-.571 1.298-.903 1.43zm2.959 2.49h-1.31v-5.367h1.31v5.367zm15.18 0h-1.817l-2.433-4.028v4.028h-2.61l-.5-1.197H33.21l-.482 1.197h-1.502c-.623 0-1.41-.138-1.856-.593-.454-.456-.688-1.074-.688-2.049 0-.796.141-1.524.687-2.1.413-.428 1.062-.625 1.948-.625h1.239v1.15h-1.215c-.467 0-.732.069-.986.318-.219.226-.368.653-.368 1.216 0 .574.114.988.354 1.259.199.213.559.277.894.277h.575l1.812-4.22h1.922l2.17 5.076v-5.076h1.955l2.254 3.738v-3.738h1.313v5.367zm-11.448-3.33-.557 1.299c-.123 0-.206-.014-.252-.026-.043-.08-.102-.257-.102-.625 0-.372.09-.565.102-.582.037-.036.068-.067.369-.067l.44.001z"
					fill={themeColors.white["85"]}
				/>
				<Path
					d="m18.651 28.578 1.97 2.188v-4.303zM15.597 26.996h-3.214v.975h2.815v1.096h-2.815v1.068h3.152L17 28.558z"
					fill={themeColors.white["85"]}
				/>
			</G>
		</Svg>
	);
}
