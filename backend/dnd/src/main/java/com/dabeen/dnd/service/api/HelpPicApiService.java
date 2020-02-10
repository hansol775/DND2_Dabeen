// HelpPicApiService.java
// 작성자 : 권영인


package com.dabeen.dnd.service.api;

import com.dabeen.dnd.exception.NotFoundException;
import com.dabeen.dnd.model.entity.HelpPic;
import com.dabeen.dnd.model.network.Header;
import com.dabeen.dnd.model.network.request.HelpPicApiRequest;
import com.dabeen.dnd.model.network.response.HelpPicApiResponse;
import com.dabeen.dnd.model.pk.HelpPicPK;
import com.dabeen.dnd.repository.HelpPicRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class HelpPicApiService  {

    @Autowired
    private HelpPicRepository helpPicRepository;

    public Header<HelpPicApiResponse> create(Header<HelpPicApiRequest> request){
        HelpPicApiRequest helpPicApiRequest = request.getData();

        HelpPic helpPic = HelpPic.builder().path(helpPicApiRequest.getPath()).build();
        
        HelpPic newHelpPic = helpPicRepository.save(helpPic);
        
        return Header.OK(response(newHelpPic));
    
    }

    public Header<HelpPicApiResponse> read(HelpPicPK helpPicPK){

        return helpPicRepository.findById(helpPicPK).map(helpPic -> response(helpPic)).map(helpPic -> Header.OK(helpPic)).orElseThrow(() -> new NotFoundException("HelpPic"));
    
    }

    public Header<HelpPicApiResponse> update(Header<HelpPicApiRequest> request){
        
        HelpPicApiRequest helpPicApiRequest = request.getData();

        HelpPicPK pk = new HelpPicPK(helpPicApiRequest.getHelpNum(), helpPicApiRequest.getPicOrnu());

        return helpPicRepository.findById(pk).map(helpPic -> helpPic.setPath(helpPicApiRequest.getPath()))
                                                                                    .map(
                                                                                        newHelpPic -> helpPicRepository.save(newHelpPic)
                                                                                    ).map(
                                                                                        hp -> Header.OK(response(hp))
                                                                                    ).orElseThrow(() -> new NotFoundException("HelpPic"));
    }

    public Header delete(HelpPicPK helpPicPK){
        
        return helpPicRepository.findById(helpPicPK).map(helpPic -> {
            helpPicRepository.delete(helpPic);
            return Header.OK();
            }).orElseThrow( () -> new NotFoundException("HelpPic"));
    
    }

    public HelpPicApiResponse response(HelpPic helpPic){

        HelpPicApiResponse helpPicApiResponse = HelpPicApiResponse.builder()
                                                           .helpNum(helpPic.getHelpNum())
                                                           .picOrnu(helpPic.getPicOrnu())
                                                           .path(helpPic.getPath()).build();
        
        return helpPicApiResponse;

    }


}