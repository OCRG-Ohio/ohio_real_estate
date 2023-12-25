<script>
	import { onMount } from 'svelte';
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch, Button, Dropdown, DropdownItem, Checkbox, ButtonGroup } from 'flowbite-svelte';
	import { Section } from 'flowbite-svelte-blocks';
	import { goto } from '$app/navigation';
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";
	
	import { PlusSolid, ChevronDownSolid, FilterSolid, ChevronRightOutline, ChevronLeftOutline } from 'flowbite-svelte-icons';
	import LoginMenu from '$lib/components/LoginMenu.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  
	let divClass='bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
	let innerDivClass='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	let searchClass='w-full md:w-1/2 relative';
	let svgDivClass='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none';
	let classInput="text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10";
  export let data;
    
	let searchTerm = '';
	let currentPosition = 0;
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = 0;
	let pagesToShow = [];
	let totalItems = data.properties.length;
	let startPage;
	let endPage;
  
	const updateDataAndPagination = () => {
	  const currentPageItems = data.properties.slice(currentPosition, currentPosition + itemsPerPage);
	  renderPagination(currentPageItems.length);
	}
  
	const loadNextPage = () => {
	  if (currentPosition + itemsPerPage < data.properties.length) {
		currentPosition += itemsPerPage;
		updateDataAndPagination();
	  }
	}
  
	const loadPreviousPage = () => {
	  if (currentPosition - itemsPerPage >= 0) {
		currentPosition -= itemsPerPage;
		updateDataAndPagination();
	  }
	}
  
	const renderPagination = (totalItems) => {
	  totalPages = Math.ceil(data.properties.length / itemsPerPage);
	  const currentPage = Math.ceil((currentPosition + 1) / itemsPerPage);
  
	  startPage = currentPage - Math.floor(showPage / 2);
	  startPage = Math.max(1, startPage);
	  endPage = Math.min(startPage + showPage - 1, totalPages);
  
	  pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	}
  
	const goToPage = (pageNumber) => {
	  currentPosition = (pageNumber - 1) * itemsPerPage;
	  updateDataAndPagination();
	}
  
	$: startRange = currentPosition + 1;
	$: endRange = Math.min(currentPosition + itemsPerPage, totalItems);
  
	onMount(() => {
	  // Call renderPagination when the component initially mounts
	  renderPagination(data.properties.length);
	});
  
	$: currentPageItems = data.properties.slice(currentPosition, currentPosition + itemsPerPage);
	$: filteredItems = data.properties.filter((item) => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  </script>
  
  <WebsiteHeader class="bg-white">
	<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
	<LoginMenu />
</WebsiteHeader>


	<Section classSection='bg-gray-50 dark:bg-gray-900 mt-20 p-3 sm:p-5'>
		<TableSearch placeholder="Search" hoverable={true} bind:inputValue={searchTerm} {divClass} {innerDivClass} {searchClass} {classInput} >
	
		<div slot="header" class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
			<Button on:click={() => goto('/listings/new')}>
				<PlusSolid class="h-3.5 w-3.5 mr-2" />Add New
			  </Button>
		  <Button color='alternative'>Actions<ChevronDownSolid class="w-3 h-3 ml-2 " /></Button>
			<Dropdown class="w-44 divide-y divide-gray-100">
			  <DropdownItem>Mass Edit</DropdownItem>
			  <DropdownItem>Delete all</DropdownItem>
			</Dropdown>
		  <Button color='alternative'>Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
			<Dropdown class="w-48 p-3 space-y-2 text-sm">
			  <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose Category</h6>
			  <li>
				<Checkbox>For Sale</Checkbox>
			  </li>
			  <li>
				<Checkbox>For Lease</Checkbox>
			  </li>	 
		
			</Dropdown>
		</div>
		  <TableHead>
			<TableHeadCell padding="px-4 py-3" scope="col">Listing Title</TableHeadCell>
			<TableHeadCell padding="px-4 py-3" scope="col">Area</TableHeadCell>
			<TableHeadCell padding="px-4 py-3" scope="col">Type</TableHeadCell>
			<TableHeadCell padding="px-4 py-3" scope="col">Price</TableHeadCell>
			<TableHeadCell padding="px-4 py-3" scope="col">
				<span class="sr-only">Actions</span>
			</TableHeadCell>
		  </TableHead>
		  <TableBody class="divide-y">
			{#if searchTerm !== ''}
			  {#each filteredItems as item (item.id)}
				<TableBodyRow>
					<TableBodyCell tdClass="px-4 py-3">{item.title}</TableBodyCell>
					<TableBodyCell tdClass="px-4 py-3">{item.area}</TableBodyCell>
					<TableBodyCell tdClass="px-4 py-3">{item.type}</TableBodyCell>
					<TableBodyCell tdClass="px-4 py-3">{item.price}</TableBodyCell>
					<TableBodyCell tdClass="px-4 py-3">
						<Button class="bg-transparent hover:bg-transparent"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 4">
							<path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M2.49 2h.01m6 0h.01m5.99 0h.01"/>
						  </svg></Button>
	<Dropdown>
	<DropdownItem href="/listings/{item.id}">Edit</DropdownItem>
	<DropdownItem>Delete</DropdownItem>
	</Dropdown>
					</TableBodyCell>
				</TableBodyRow>
			  {/each}
			{:else}
			  {#each currentPageItems as item (item.id)}
				<TableBodyRow>
				  <TableBodyCell tdClass="px-4 py-3">{item.title}</TableBodyCell>
				  <TableBodyCell tdClass="px-4 py-3">{item.area}</TableBodyCell>
				  <TableBodyCell tdClass="px-4 py-3">{item.type}</TableBodyCell>
				  <TableBodyCell tdClass="px-4 py-3">{item.price}</TableBodyCell>
				  <TableBodyCell tdClass="px-4 py-3">
					<Button class="bg-transparent hover:bg-transparent"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 4">
						<path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M2.49 2h.01m6 0h.01m5.99 0h.01"/>
					  </svg></Button>
<Dropdown>
<DropdownItem href="/listings/{item.id}">Edit</DropdownItem>
<DropdownItem>Delete</DropdownItem>
</Dropdown>
				</TableBodyCell>
				</TableBodyRow>
			  {/each}
			{/if}
		  </TableBody>
		  <div slot="footer" class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
		  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
			Showing
			<span class="font-semibold text-gray-900 dark:text-white">{startRange}-{endRange}</span>
			of
			<span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
		  </span>
			<ButtonGroup>
			  <Button on:click={loadPreviousPage} disabled={currentPosition === 0}><ChevronLeftOutline size='xs' class='m-1.5'/></Button>
			  {#each pagesToShow as pageNumber}
				<Button on:click={() => goToPage(pageNumber)}>{pageNumber}</Button>
			  {/each}
			  <Button on:click={loadNextPage} disabled={ totalPages === endPage }><ChevronRightOutline size='xs' class='m-1.5'/></Button>
			</ButtonGroup>
		  </div>
		</TableSearch>
	</Section>