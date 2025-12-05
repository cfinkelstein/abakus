<script lang="ts">

	import type { AbakusData } from "$lib/views/abakus/abakus.ts";
	import AbakusDashboard from "$lib/views/abakus/AbakusDashboard.svelte";
	import AbakusTask from "$lib/views/abakus/AbakusTask.svelte";
	import AbakusValue from "$lib/views/abakus/AbakusValue.svelte";
	import AbakusResult from "$lib/views/abakus/AbakusResult.svelte";

	import abakusImage from '$lib/assets/abakus.svg';

	// create an array with terms of sum with max 3 terms with random numbers between 1 and 99
	function calculateTerms(): number[] {
		//const termsCount = Math.floor(Math.random() * 2) + 1;
		const termsCount = 2;
		const terms: number[] = [];
		for (let i = 0; i < termsCount; i++) {
			terms.push(Math.floor(Math.random() * 10) + 1);
		}
		return terms;
	}

	let exampleData: AbakusData;

	
	function init() {

		const hundreds = {
				name: 'Hundreds',
				shortName: '100s',	
				index: 0,			
				items: Array(10).fill(0).map((_, i) => ({
					id: `hundreds-${i+1}`,
					nr: i + 1,
					value: 100,
					selected: false,
					hint: false,
					parentName: 'Hundreds',
					callback: () => clickCallBack(i, 0)
				}))
			};

		const tens = {
					name: 'Tens',
					shortName: '10s',
					index: 1,
					items: Array(10).fill(0).map((_, i) => ({
						id: `tens-${i+1}`,
						nr: i + 1,
						value: 10,
						selected: false,
						parentName: 'Tens',
						hint: false,
						callback: () => clickCallBack(i, 1)
					}))
				};

		const ones = {
					name: 'Ones',
					shortName: '1s',				
					index: 2,
					items: Array(10).fill(0).map((_, i) => ({
						id: `ones-${i+1}`,
						nr: i + 1,
						value: 1,
						selected: false,
						parentName: 'Ones',
						hint: false,
						callback: () => clickCallBack(i, 2)
					}))
				};

		const initialTerms = calculateTerms();
		const initialExpected = initialTerms.reduce((a, b) => a + b, 0);

		exampleData = {
			... exampleData,
			rows: [
				hundreds, tens, ones
			],
			title: "Abakus Example",
			currentValue: { value: 0 },
			task: { terms: initialTerms, actual: 0, expected: initialExpected },
			result: { expected: initialExpected, actual: 0 }
		};
	}

	//init on component load
	init();

	function clickCallBack(itemIndex: number, rowIndex: number, pulseHint: boolean = false) {

		exampleData.rows[rowIndex].items[itemIndex].selected = !exampleData.rows[rowIndex].items[itemIndex].selected;
		if (pulseHint) {
			exampleData.rows[rowIndex].items[itemIndex].hint = true;
			setTimeout(() => {
				exampleData.rows[rowIndex].items[itemIndex].hint = false;
				exampleData = { ...exampleData };
			}, 3000);
		}

		// find selected row and set all the following item to selected true
		// find selected row and set all the previous item to selected false
		const row = exampleData.rows[rowIndex];
		row.items.forEach((item, index) => {
			if (index < itemIndex) {
				item.selected = false;
			} else if(index > itemIndex) {
				item.selected = true;
			}
		});
		
		// calculate the absolute value
		let absoluteValue = 0;
		exampleData.rows.forEach(r => {
			r.items.forEach(i => {
				if (i.selected) {					
					absoluteValue += i.value;
				}
			});
		});
		exampleData.currentValue.value = absoluteValue;
		exampleData.result.actual = absoluteValue;
		exampleData.task.actual = absoluteValue;
		// all the elements in fron
		exampleData = { ...exampleData };

		// in case current value matches expected, re-init after short delay
		if (exampleData.result.actual === exampleData.result.expected) {
			setTimeout(() => {
				init();
			}, 2000);
			/*fetch('http://192.168.178.65/relay/0?turn=on').catch(console.error);
			setTimeout(() => {
				fetch('http://192.168.178.65/relay/0?turn=off').catch(console.error);
			}, 3000);*/
		} else {
			setTimeout(() => {
				const allSelected = exampleData.rows[rowIndex].items.every(i => i.selected);
				if(allSelected) {
					clickCallBack(
					exampleData.rows[rowIndex].items.length - 1, rowIndex);
					if(rowIndex > 0) {
						const previousRow = exampleData.rows[rowIndex - 1];
						let lastSelected = previousRow.items.findIndex(i => i.selected);
						if(lastSelected === -1) {
							lastSelected = previousRow.items.length;
						}
						clickCallBack(lastSelected - 1,rowIndex - 1, true);
					}
				}
			}, 500);
		}
	}

</script>


<div class="w-full max-w-6xl">
<div class="p-8">
	<!--<div class="text-center">
		<img src={abakusImage} alt="Abakus Logo" class="mx-auto mb-4 w-48 h-auto" />
	</div>-->
	<div class="text-center">
		<AbakusTask task={exampleData.task} />
	</div>
	
	<!--<div class="text-center">
		<AbakusValue abakusValue={exampleData.currentValue} />
	</div>-->
	<!--<div class="text-center">
		<AbakusResult abakusResult={exampleData.result} />
	</div>-->
</div>
<div>	
		<AbakusDashboard data={exampleData} />
	<!---->
</div>

</div>




