<script>
	import { page } from '$app/stores';
    import { Tabs, TabItem } from 'flowbite-svelte';
    import { z } from "zod";
    import PageHeader from '$lib/img/valuation2.webp'

export let mytab;
import PlainText from './PlainText.svelte';
  import RichText from './RichText.svelte'; 
  const formSubject = "Property Evaluation Form";

    let activeTab = 1;
let form = {
    address: '',
    name: '',
    email: '',
    phoneNumber: '',
    timeFrame: ''
};

let formErrors = {
    address: null,
    name: null,
    email: null,
    phoneNumber: null,
    timeFrame: null
};

const addressSchema = z.object({
    address: z.string().min(1, 'Address is required')
});

const detailsSchema = z.object({
    name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    timeFrame: z.string()
});

let isLoading = false;
let errorMessage = '';
let successMessage ='';

const handleContinue = async () => {
    const result = addressSchema.safeParse({ address: form.address });
    if (!result.success) {
        formErrors = result.error.format();
        return;
    }

    activeTab = 2;
};

const handleSubmit = async (event) => {
    event.preventDefault();
    isLoading = true;
    errorMessage = '';
    successMessage ='';

    const result = detailsSchema.safeParse(form);

    if (!result.success) {
        formErrors = result.error.format();
        isLoading = false;
        return;
    }

    try {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => formData.append(key, value));
        formData.append('formSubject', formSubject);
        const response = await fetch("/api/sendEmail", {
            method: "POST",
            body: formData,
        });
        if (response.status === 200) {
          activeTab = 3;
        successMessage = "Email sent successfully";
        form = { email: "", phoneNumber: "", timeFrame: "", name:'',address:'' };
      } else {
        const errorData = await response.json();
            errorMessage = errorData.message || "Error sending email";
      }
    
    } catch (error) {
        console.error(error);
        errorMessage = "Internal server error";
    } finally {
        isLoading = false;
    }
};
  </script>

  <Tabs class="nav">
    <TabItem open={activeTab === 1} title="1" class="tabItem">
 
        <form class="flex flex-col space-y-6">
            <div class="homeValuation1">
                <h2><PlainText bind:content={mytab.title} /></h2>
                <form>
                  <div class="valuationForm">
                    <div class="address">
                      <label for="address">Property Address</label>
                      <input type="text" bind:value={form.address} placeholder="Enter Address">
                      {#if formErrors.address}<span class="error">{formErrors.address.message || 'Enter Full Address'}</span>{/if}
                    </div>
                    <button type="button" on:click={handleContinue}>Continue</button>
                  </div>
                </form>
              </div>
           
        </form>
  
    </TabItem>
    <TabItem open={activeTab === 2} disabled={activeTab < 2} title="2" class="tabItem">
        <form on:submit={handleSubmit} class="flex flex-col space-y-6">

            <div class="homeValuation2">
                <h5 class="text-center">CONTACT INFORMATION</h5>
                <h3>
                  Almost There! You're 1 Step Away
                </h3>
             
                  <div class="inp">
                    <label for="full_name">FULL NAME:</label>
                    <input required type="text" bind:value={form.name}  name="full_name" class="text-input" placeholder="Full Name">
                    {#if formErrors.name}<span class="error">{formErrors.name}</span>{/if}
                  </div>
                  <div class="inp">
                    <label for="email_address">EMAIL ADDRESS:</label>
                    <input required type="email" bind:value={form.email} placeholder="Email Address" class="text-input" name="email_address" >
                    {#if formErrors.email}<span class="error">{formErrors.email}</span>{/if}
                  </div>
                  <div class="inp">
                    <label for="phone_number">PHONE NUMBER:</label>
                    <input required type="tel" bind:value={form.phoneNumber} placeholder="phone_number"  class="text-input" name="phoneNumber">
                    {#if formErrors.phoneNumber}<span class="error">{formErrors.phoneNumber}</span>{/if}
                  </div>
                  <div class="inp">
                    <label for="time_frame">TIME FRAME: (Optional)</label>
                    <select bind:value={form.timeFrame} name="time_frame">
                        <option value="">Select Time Frame</option>
                        <option value="I want to sell my home now">I want to sell my home now</option>
                        <option value="In the next 3 months">In the next 3 months</option>
                        <option value="In the next 12 months">In the next 12 months</option>
                        <option value="I'm just curious about my home's value">I'm just curious about my home's value</option>
                    </select> 
                    {#if formErrors.timeFrame}<span class="error">{formErrors.timeFrame}</span>{/if}                   
                  </div>
                  <p class="disclaimer"><RichText bind:content={mytab.disclaimer} />
                  </p>
                  <div class="col-12 text-center">
                    <button type="submit" disabled={isLoading}>  {#if isLoading}
                      <div class="loader"></div>
                      Submitting...
                    {:else}
                      Submit
                    {/if}</button>
                  </div>
                  {#if successMessage}
          <p class="success">{successMessage}</p>
        {/if}
        {#if errorMessage}
          <p class="error">{errorMessage}</p>
        {/if}
            
              </div>       
        </form>
    </TabItem>
    <TabItem open={activeTab === 3} disabled={activeTab < 3} title="3">
        <div class="homeValuation3">
          <!-- {#if successMessage}
          <p class="success">{successMessage}</p>
        {/if}
        {#if errorMessage}
          <p class="error">{errorMessage}</p>
        {/if} -->
  
            <h5>Thank You!</h5>
            <h3><PlainText bind:content={mytab.thanks} /></h3> 
            <button type="button">VIEW LISTINGS FOR SALE</button>
          </div>
    </TabItem>
  </Tabs>
  <style>
    .error{
      color:red;
    }
    .success{
      color:green;
    }
        .loader {
          border: 2px solid var(--myBlue);
          border-radius: 50%;
          border-top: 2px solid #ffffff; /* Change the color as needed */
          width: 20px;
          height: 20px;
          animation: spin 2s linear infinite;
        }
      
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    
      