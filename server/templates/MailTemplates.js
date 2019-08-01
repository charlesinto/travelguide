class MailTemplates {
    emailReservationTemplate(fullname, carurl, transportProvide, reference,
        booknumber, date, from, to, number_of_seats) {
        return `
        <style>
        body{
          margin: 20px;
        }
        *{
          margin: 0;
        }
        .text-shadow{
         text-shadow: 0 1px 0 #ccc,
                 0 1px 0 #c9c9c9,
                 0 3px 0 #bbb,
                 0 4px 0 #b9b9b9,
                 0 5px 0 #aaa,
                 0 3px 1px rgba(0,0,0,.1),
                 0 0 5px rgba(0,0,0,.1),
                 0 1px 3px rgba(0,0,0,.3),
                 0 3px 5px rgba(0,0,0,.2),
                 0 5px 10px rgba(0,0,0,.25),
                 0 10px 10px rgba(0,0,0,.2),
                 0 20px 20px rgba(0,0,0,.15);
        }
        .enjoy-trip {
          font-size:1.3em;
        }
        .section{
          margin: .8em 0 0.8em 0.4em;
        }
        .booking-type{
          text-align: center;
          margin:1.5em 0 0 0;
          font-weight: 600;
          font-size: 20px;
          color:#00535A;
        }
        .greetings h3{
           
        }
        .warning{
          color: rgb(220,20,60);
          text-align: center;
          margin: 1.5em 0 0 0;
        }
        .regards{
          font-weight: 600;
          margin:1.3em 0 .5em 0;
        }
      table {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    max-width: 100%;
    width: 600px;
    margin: 1.5em auto;
  }
  
  table td, table th {
    border: 1px solid #ddd;
    padding: 5px 20px 5px 20px;
  }
  
  table tr:nth-child(even){background-color: #f2f2f2;}
  
  table tr:hover {background-color: #ddd;}
  
  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #00535A;
    color: white;
  }
      </style>
       <header>
         <div style="display:block; position:relative">
         <div
            style="width:100%; height:170px; position:relative"
            
         >
           <img style="display:inline-block;min-width:100%; height:100%" src=${carurl} />
            
         </div>
          <h3 class="text-shadow enjoy-trip" style="color: rgb(255,255,255); margin: .35em 0.5em ; position:absolute; top:0">
            Have a great trip</h3>
         </div>
       </header>
       <section class="section booking-type">SEAT RESERVATION</section>
       <section class="section">
         <h3>
           Dear ${fullname}
         </h3>
       </section>
       
       <section>
         <div>
           Thank you for making your booking with companyName, below are the details of your itinerary.
  
  Please note that this reservation will expire at the time and date indicated below.
  
  Payment should be processed prior to the expiration time.
  
  If you have any queries about your booking,<a href="" target="_blank">click here</a>  to view our Help pages or view the contact details for your local travelguide Air office.
  
  We hope you have a pleasant journey and look forward to taking care of your travel bookings in the future.
  
  <div class="warning">
    Please note, this reference number expires after 2 hours after which the
    seats will be withdrawn if payment is not confirmed
  </div>
  
  <div class="regards">
    Best Regards
  </div>
  <div class="companyname">
    Travel Guide
  </div>
  
  
         </div>
       </section>
       <section>
         <table>
           <tr>
      <th>Itinery</th>
      <th>Booknumber</th>
      <th>Reference number</th>
      <th>From</th>
      <th>To</th>
      <th>Date</th>
      <th>Number of Seats</th>
    </tr>
    <tr>
      <td>${transportProvide}</td>
      <td>${booknumber}</td>
      <td>${reference}</td>
      <td>${from}</td>
      <td>${to}</td>
      <td>${date}</td>
      <td>${number_of_seats}</td>
    </tr>
    </table>
       </section>
        `
    }
}

export default new MailTemplates;