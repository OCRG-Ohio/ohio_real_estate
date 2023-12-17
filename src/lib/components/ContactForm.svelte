<script>
  import { z } from "zod";
  import { Card, Input, Textarea } from "flowbite-svelte";

  const formSubject = "General Enquiry Form";


  const contactFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(1, "Please enter a full name"),
    body: z.string() // Add any validations for the body if needed
  });

  let form = {
    email: "",
    name: "",
    body: "",
  };

  let formErrors = {
    email: null,
    name: null,
    body: null
  };

  let successMessage = "";
  let errorMessage = "";
  let isLoading = false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    isLoading = true;
    successMessage = "";
    errorMessage = "";

    // Validate form
    const result = contactFormSchema.safeParse(form);
    if (!result.success) {
      formErrors = result.error.format(); // Format Zod errors
      isLoading = false;
      return;
    }

    try {
      // Form submission logic
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("name", form.name);
      formData.append("body", form.body);
      formData.append("formSubject", formSubject);

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        successMessage = "Email sent successfully";
        form = { email: "", name: "", body: "" };
      } else {
        errorMessage = "Error sending email";
      }
    } catch (error) {
      console.error(error);
      errorMessage = "Internal server error";
    } finally {
      isLoading = false;
    }
  };
</script>

<Card class="mt-6 rounded isolate w-[360px] p-8 sm:py-10 " >
  <div class="">
    <h2 class="small-title text-primary-700">Get in touch.</h2>
    <form on:submit={handleSubmit} class="flex flex-col space-y-6">
      <Input required type="text" name="name" bind:value={form.name} placeholder="Name"/>
      {#if formErrors.name}<span class="error">{formErrors.name}</span>{/if}

      <Input required type="email" name="email" bind:value={form.email} placeholder="Email"/>
      {#if formErrors.email}<span class="error">{formErrors.email}</span>{/if}   

      <Textarea required id="textarea-id" placeholder="Your message" rows="4" name="body" bind:value={form.body}/>
      {#if formErrors.body}<span class="error">{formErrors.body}</span>{/if}

      <button
        type="submit"
        class="tBtn2 w-full tBtn2Alt mt-6 relative items-center gap-2"
        id="submitButton"
        disabled={isLoading} 
      >
        {#if isLoading}
          <div class="loader"></div>
          Submitting...
        {:else}
          Submit
        {/if}
      </button>       
   
        {#if successMessage}
          <p class="success">{successMessage}</p>
        {/if}
        {#if errorMessage}
          <p class="error">{errorMessage}</p>
        {/if}  
      
      </form>
    </div>
    
  </Card>

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

  