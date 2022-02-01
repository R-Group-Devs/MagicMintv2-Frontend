import react from "react";
import "./CreateCampaign.css"
import Header from '../Navbar/Header';


function Campaign(){
    

    return(
        <div>

        <Header/>

        <div className="form-modal">
            <form>
                <div class="form-group">
                    <label for="twitterHandle">Twitter Handle</label>
                    <input type="text" class="form-control" id="twitterHandle" aria-describedby="twitterHandleDesc" placeholder="" disabled/>
                    <small id="twitterHandleDesc" class="form-text text-muted">test</small>
                </div>
                <div class="form-group">
                    <label for="postID">Twitter Post</label>
                    <input type="text" class="form-control" id="postID" aria-describedby="twitterHandleDesc" placeholder="ID"/>
                    <small id="twitterHandleDesc" class="form-text text-muted">enter twitter post to create campaign</small>

                </div>
          
     
                <div>
                    Campaign NFT    
                </div>
                <div class="form-group">
                    <label for="imageNFT">Choose NFT</label>
                    <input type="file" class="form-control-file" id="imageNFT" aria-describedby="imageNFTDesc"/>
                    <small id="imageNFTDesc" class="form-text text-muted">test</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>

        </div>
    )
}


export default Campaign;