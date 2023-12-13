<script>
    import { z } from 'zod';
    import { Card, Input, Button, Select } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let step = 1;
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

    const handleContinue = async () => {
        const result = addressSchema.safeParse({ address: form.address });
        if (!result.success) {
            formErrors = result.error.format();
            return;
        }

        step = 2;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        isLoading = true;
        errorMessage = '';

        const result = detailsSchema.safeParse(form);

        if (!result.success) {
            formErrors = result.error.format();
            isLoading = false;
            return;
        }

        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));

            const response = await fetch("/api/sendEmail", {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                dispatch('formSubmitted'); // Notify parent component
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


    {#if step === 1}
        <form class="flex flex-col space-y-6">
            <div class="homeValuation1">
                <h2>What's Your Property Worth?</h2>
                <form>
                  <div class="valuationForm">
                    <div class="address">
                      <label for="address">Property Address</label>
                      <input type="text" bind:value={form.address} placeholder="Enter Address">
                      {#if formErrors.address}<span class="error">{formErrors.address}</span>{/if}
                    </div>
                    <button type="button" on:click={handleContinue}>Continue</button>
                  </div>
                </form>
              </div>
           
        </form>
    {:else if step === 2}
        <form on:submit={handleSubmit} class="flex flex-col space-y-6">

            <div class="homeValuation2">
                <h5>CONTACT INFORMATION</h5>
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
                  <div class="disclaimer">Aenean egestas lacus id massa efficitur, vel pulvinar turpis varius. Praesent
                    a sem turpis. Morbi egestas luctus nisl dictum convallis. Maecenas rhoncus congue neque. Etiam cursus
                    turpis dolor, non accumsan ex dignissim sit amet. Ut blandit lobortis ornare. Phasellus placerat, sem
                    in dapibus tincidunt, tellus libero feugiat ex, ut malesuada lectus ex id ipsum.
                  </div>
                  <div class="col-12 text-center">
                    <button type="submit" disabled={isLoading}> {#if isLoading}Submitting...{:else}GET MY VALUATION{/if}</button>
                  </div>
                  {#if errorMessage}
                  <p class="error">{errorMessage}</p>
              {/if}
            
              </div>       
        </form>
    {/if}


<style>
    .error {
        color: red;
    }
    .success {
        color: green;
    }
</style>
