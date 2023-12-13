<script>
      import {activeTab,currentTab} from "$lib/stores"
      import { writable } from 'svelte/store';
  
    let tabs = [
        { id: 'tab1', label: '1' },
        { id: 'tab2', label: '2' },
        { id: 'tab3', label: '3' }
    ];

    const switchTab = (tab) => {
      activeTab.set(tab);
    };
  </script>
  
  <ul class="tab-list">
    {#each tabs as tab (tab.id)}
        <li class="tab-item">
            <button
                class="tab-button {tab.id === $activeTab.id ? 'active' : 'disable'}"
                on:click={() => switchTab(tab)}
            >
                {tab.label}
            </button>
        </li>
    {/each}
</ul>

  
